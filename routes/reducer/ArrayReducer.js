const fs = require("fs");
const puppeteer = require("puppeteer");

const modifiedItem = [];

const reducer1 = async () => {
  const data1 = fs
    .readFileSync("C:/Users/wasim/Desktop/FB_Project/routes/reducer/data.json")
    .toString();
  const data2 = fs
    .readFileSync("C:/Users/wasim/Desktop/FB_Project/routes/reducer/data2.json")
    .toString();
  const removeMatchingElements = (data1, data2) => {
    // Create a new empty array to store the non-matching elements
    const nonMatching = [];

    // Iterate over arr1
    for (const element of data1) {
      // Check if the element is not present in arr2
      if (!data2.includes(element)) {
        // If it is not present, add it to the nonMatching array
        nonMatching.push(element);
        console.log(nonMatching);
      }
    }

    // Return the nonMatching array
    return nonMatching;
    console.log(nonMatching);
  };
  console.log(data1, data2);
  if (data1 === data2) {
    console.log("The files are same");
  } else {
    console.log("The files are different.");
    removeMatchingElements(data1, data2);
  }
};
module.exports = { reducer1 };
