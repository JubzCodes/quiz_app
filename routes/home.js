
const express = require('express');
const router = express.Router();
//This is out home page
module.exports = (db) => {
  router.get("/home", (req, res) => {
    res.send("this is a test HOME!")
  })

  //This is for quiz attempt
  router.get("/quiz", (req, res) => {
    res.render("attemptquiz")
  })





  return router;
};
