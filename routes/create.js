const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/create", (req, res) => {
    res.send("this is a test CREATE!")
  })
  //ADD SQL TO ADD INFO TO DATABASE

  return router;
};
