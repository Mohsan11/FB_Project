const express = require("express");
const router = require("express").Router();
const { storeimages, storelinks } = require("./controllers/FbController");
router.get("/storelinks", storelinks);
router.get("/storeimages", storeimages);

module.exports = router;
