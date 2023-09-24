/**
 * Create a string with a specific length.
 *
 * @param {number} size The size of the string to create
 * @returns A string consisting of zeros.
 */
function createStringWithLength(size) {
  return new Array(size + 1).join("0");
}

/**
 * Try to empty the local storage.
 * Note: This does not seem to always work correctly. I have not been able to
 * determine why yet.
 */
function clearLocalStorage() {
  for (let i = 0; i < 100 && localStorage.length > 0; i++) {
    console.warn("Local storage is not empty. Trying to clear.");
    localStorage.clear();
  }
  console.log("Local storage cleared.");
}

/**
 * Finds the upper bound by filling the local storage with a string of increasing
 * length (double with each iteration).
 *
 * @returns The upper bound on which an error was thrown.
 */
function findInitialUpperBound() {
  console.info("Looking for upper bound.");
  let upperBound = 1;

  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const testString = createStringWithLength(upperBound);
      localStorage.setItem("item", testString);
      upperBound = 2 * upperBound;
    }
  } catch (error) {
    // console.error(error);
    console.log("Upper bound found: ", upperBound);
  }
  return upperBound;
}

/**
 * Determine the size of the local storage using binary search.
 *
 * @param {number} upperBound The initial upper bound
 * @param {number} lowerBound The initial lower bound
 */
function determineLocalStorageSize(upperBound, lowerBound) {
  console.info("Determining size of local storage.");
  const bailOut = 100;

  for (let i = 0; i < bailOut && lowerBound < upperBound; i++) {
    const testBound = lowerBound + Math.ceil((upperBound - lowerBound) / 2);

    try {
      const testString = createStringWithLength(testBound);
      localStorage.setItem("item", testString);

      lowerBound = testBound;
    } catch (error) {
      // console.error(error);
      upperBound = testBound - 1;
    }
    console.log({ lowerBound, upperBound });
  }
  console.info(`Size of local storage: ${upperBound} characters`);
  return lowerBound;
}

document.getElementById("test-start")?.addEventListener("click", () => {
  let upperBound = findInitialUpperBound();
  let lowerBound = Math.floor(upperBound / 2);
  const result = determineLocalStorageSize(upperBound, lowerBound);

  document.getElementById(
    "result"
  ).innerText = `The maximum size of local storage is ${result} characters.`;
  
  clearLocalStorage();
});
