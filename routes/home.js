
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/home", (req, res) => {
    res.send("this is a test HOME")
  })

  return router;
};
