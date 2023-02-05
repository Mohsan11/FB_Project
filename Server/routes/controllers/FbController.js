const puppeteer = require("puppeteer");
const http = require("http");
const fs = require("fs");
const path = require("path");
const { title } = require("process");
const filepath = path.resolve(__dirname, "../../", "test.html");
const savingPath = path.resolve(__dirname, "../../../Client/fb/src/data");
const storeimages = async (req, res) => {
  try {
    const regex = /<img[^>]+src=["'](.*?)['"]/g;
    await fs.readFile(filepath, "utf-8", function (err, html) {
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
    });
  } catch (error) {
    res.status(400).send("Server Error", error);
  }
};
//Store Links------------------------------------------------------------------------------------------------------
const storelinks = async (req, res) => {
  try {
    const linkRegex = /<a[^>]+href=["'](.*?)['"]>/g;
    await fs.readFile(filepath, "utf-8", function (err, html) {
      if (err) {
        console.log("Error: ", err);
      }
      const linkTags = html.match(linkRegex);
      const linkTagsClean = linkTags.map((linkTag) =>
        linkTag.replace(/class=".*?"/g, "")
      );
      fs.writeFile("links.json", JSON.stringify(linkTagsClean), function (err) {
        if (err) {
          console.log(err);
        }
        console.log("File Saved.");
      });
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send("Server Error", error);
  }
};
let arr = [];
let data = [
  {
    price: "",
    titles: "",
    id: "",
    image: "",
  },
];
//Store Titles------------------------------------------------------------------------------------------------------
const imgPath = path.resolve(__dirname, "../../", "img.json");

const getTitle = async (req, res) => {
  try {
    const titleRegex = /alt=\\["'](.*?)['"]/g;
    await fs.readFile(filepath, "utf-8", function (err, html) {
      if (err) {
        console.log("Error: ", err);
      }
      for (let i = 0; i < html.length; i++) {
        if (IsAlt(html, i)) {
          arr.push(getUntilEmptyspace(i, html));
        }
      }
      for (let i = 0; i < arr.length; i++) {
        data.push({ titles: arr[i].replace('alt="', "") });
      }
      console.log(data);
      fs.writeFile("title.json", JSON.stringify(data), function (err) {
        if (err) {
          console.log(err);
        }
        res.status(200).send("File Saved.");
      });
    });
  } catch (error) {
    res.status(400).send("Server Error", error);
  }
};

//Store id------------------------------------------------------------------------------------------------------
const getId = async (req, res) => {
  try {
    const idRegex = /\/item\/\d*[\/?]/g;
    await fs.readFile(filepath, "utf-8", function (err, html) {
      if (err) {
        console.log("Error: ", err);
      }
      const id = html.match(idRegex);
      for (let i = 0; i < id.length; i++) {
        data.push({ id: id[i].replace("/item/", "") });
      }
      console.log(data);
      fs.writeFile("id.json", JSON.stringify(data), function (err) {
        if (err) {
          console.log(err);
        }
        console.log("File Saved.");
      });
    });
  } catch (error) {
    res.status(400).send("Server Error", error);
  }
};

//Store Price------------------------------------------------------------------------------------------------------
const getPrice = async (req, res) => {
  try {
    const priceRegex = /[>?]£\d*[<?]/g;
    await fs.readFile(filepath, "utf-8", function (err, html) {
      if (err) {
        console.log("Error: ", err);
      }
      const price = html.match(priceRegex);
      for (let i = 0; i < price.length; i++) {
        data.push({ price: price[i] });
      }
      console.log(data);
      fs.writeFile("price.json", JSON.stringify(data), function (err) {
        if (err) {
          console.log(err);
        }
        console.log("File Saved.");
      });
    });
  } catch (error) {
    res.status(400).send("Server Error", error);
  }
};

//Allinone------------------------------------------------------------------------------------------------------
const allInone = async (req, res) => {
  try {
    const titleRegex = /alt=\\["'](.*?)['"]/g;
    const idRegex = /\/item\/\d*[\/?]/g;
    const priceRegex = /[>?]£\d*[<?]/g;
    const imgRegex = /<img[^>]+src=["'](.*?)['"]/g;
    let imageTagArr = [];
    await storeimages();
    await fs.readFile(filepath, "utf-8", function (err, html) {
      if (err) {
        console.log("Error: ", err);
      }
      //Get Title
      for (let i = 0; i < html.length; i++) {
        if (IsAlt(html, i)) {
          arr.push(getUntilEmptyspace(i, html));
        }
      }
      //Get Price
      const price = html.match(priceRegex);
      //Get Price
      const id = html.match(idRegex);
      //Get ImageTag
      const image = html.match(imgRegex);
      for (let i = 0; i < image.length; i++) {
        if (
          (image[i] === "L",
          image[i + 1] === "o",
          image[i + 2] === "a",
          image[i + 3] === "d",
          image[i + 4] === "i",
          image[i + 5] === "n",
          image[i + 6] === "g" || image[i] === " ",
          image[i + 1] === " ",
          image[i + 2] === " ")
        ) {
          i++;
        }
        imageTagArr.push(
          image[i]
            .replace(/class="[^"]*"/, "")
            .replace(/referrerPolicy="[^"]*"/, "")
            .replace(/<img.*src="/, "")
        );
      }
      for (let i = 0; i < price.length; i++) {
        data.push({
          price: (price[i] = (price[i] || "")
            .replace(">£", "")
            .replace("<", "")),
          titles: (arr[i] = (arr[i] || "").replace('alt="', "")),
          id: (id[i] = (id[i] || "").replace("/item/", "")),
          image: (imageTagArr[i] = (imageTagArr[i] || "").replace(
            /alt="[^"]*"/,
            ""
          )),
        });
      }

      // console.log(data);
      fs.writeFile(
        `${savingPath}/AllInOne.js`,
        JSON.stringify(data),
        function (err) {
          if (err) {
            res.status(400).send({ message: "File not saved!", err });
            console.log(err);
          }
          res.status(200).send({ message: "File Saved.", data });
        }
      );
    });
  } catch (error) {
    res.status(400).send({ message: "Server Error", error });
  }
};
//ImgTag---------------------------------------------------------------------------------------
const imagePath = path.resolve(__dirname, "../../", "test.html");
const imageTag = async (req, res) => {
  try {
    const imgRegex = /<img[^>]+src=["'](.*?)['"]/g;
    await fs.readFile(imagePath, "utf-8", function (err, html) {
      if (err) {
        console.log("Error: ", err);
      }
      const image = html.match(imgRegex);
      for (let i = 0; i < image.length; i++) {
        if (
          (image[i] === "L",
          image[i + 1] === "o",
          image[i + 2] === "a",
          image[i + 3] === "d",
          image[i + 4] === "i",
          image[i + 5] === "n",
          image[i + 6] === "g" || image[i] === " ",
          image[i + 1] === " ",
          image[i + 2] === " ")
        ) {
          i++;
        }
        data.push({
          image: (image[i] = (image[i] || "").replace("<img alt=", "")),
        });
      }
      console.log(data);
      fs.writeFile("imgtag.json", JSON.stringify(data), function (err) {
        if (err) {
          console.log(err);
        }
        console.log("File Saved.");
      });
    });
  } catch (error) {
    res.status(400).send("Server Error", error);
  }
};
//-------------------------------------------------------------------------------

//-----------------------------------------------------------------------------
let IsAlt = (html, index) => {
  if (
    html[index] === "a" &&
    html[index + 1] === "l" &&
    html[index + 2] === "t" &&
    html[index + 3] === "=" &&
    html[index + 5] !== `"` &&
    html[index + 5] + html[index + 6] + html[index + 7] + html[index + 8] !==
      "Load"
  ) {
    return getUntilEmptyspace(index, html);
  }
};

//Checkif string has space or not

let html =
  "htmlfjfa sdafoid fkajef fkjaewl f <p> weafew <a> weaf4ew fewf eaf </a>fewf ea6f </p>"; //weafew eaf
let isPTag = (index, string) => {
  if (html[index] == "<" && html[index + 1] == "p" && html[index + 2] == ">") {
    return true;
  }
};
let isString = (index, string, tagString) => {
  for (let i = 0; i < tagString.length; i++) {
    if (string[index + i] !== tagString[i]) return false;
  }
  return true;
};
let returnString = "";
for (let i = 0; i < html.length; i++) {
  if (isPTag) {
    // getUntilEmptyspace(i+4, html);
    isString(i + 4, html, "<p>");
  }
}

let stringAfterString = (index, string, firstString, secondString) => {};

let getUntilEmptyspace = (index, string) => {
  let retVal = "";
  for (let i = index; i < string.length; i++) {
    if (string[i] === "i" && string[i + 1] === "n") {
      return retVal;
    }
    retVal += string[i];
  }
};

module.exports = {
  storeimages,
  storelinks,
  getTitle,
  getId,
  getPrice,
  allInone,
  imageTag,
};
