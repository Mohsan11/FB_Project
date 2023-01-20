const puppeteer = require("puppeteer");
const http = require("http");
const fs = require("fs");
const storeimages = async (req, res) => {
  try {
    const regex = /<img[^>]+src=["'](.*?)['"]/g;
    await fs.readFile(
      "C:/Users/wasim/Desktop/FB_Project/test.html",
      "utf-8",
      function (err, html) {
        if (err) {
          console.log("Error: ", err);
        }
        var imgTags = html.match(regex);
        const imgTagsClean = imgTags.map((imgTag) =>
          imgTag.replace(/class=".*?"/g, "")
        );
        fs.writeFile("img.json", JSON.stringify(imgTagsClean), function (err) {
          if (err) {
            console.log(err);
          }
          console.log("File Saved.");
        });
        console.log(regex);
        console.log(imgTagsClean);
      }
    );
  } catch (error) {
    res.status(400).send("Server Error", error);
  }
};

const storelinks = async (req, res) => {
  try {
    const regex = /<a[^>]+href=["'](.*?)['"]>/g;
    await fs.readFile(
      "C:/Users/wasim/Desktop/FB_Project/test.html",
      "utf-8",
      function (err, html) {
        if (err) {
          console.log("Error: ", err);
        }
        const linkTags = html.match(regex);
        const linkTagsClean = linkTags.map((linkTag) =>
          linkTag.replace(/class=".*?"/g, "")
        );
        fs.writeFile(
          "links.json",
          JSON.stringify(linkTagsClean),
          function (err) {
            if (err) {
              console.log(err);
            }
            console.log("File Saved.");
          }
        );
        console.log(regex);
        console.log(linkTagsClean);
      }
    );
  } catch (error) {
    res.status(400).send("Server Error", error);
  }
};
module.exports = {
  storeimages,
  storelinks,
};
