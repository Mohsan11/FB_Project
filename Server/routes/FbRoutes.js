const express = require("express");
const router = require("express").Router();
const {
  storeimages,
  storelinks,
  getTitle,
  getId,
  getPrice,
  allInone,
  imageTag,
} = require("./controllers/FbController");
router.get("/storelinks", storelinks);
router.get("/storeimages", storeimages);
router.get("/title", getTitle);
router.get("/id", getId);
router.get("/price", getPrice);
router.get("/allinone", allInone);
router.get("/imagetag", imageTag);

module.exports = router;
