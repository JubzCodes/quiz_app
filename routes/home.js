
const express = require('express');
const router = express.Router();
//This is out home page
module.exports = (db) => {
  router.get("/home", (req, res) => {
    res.send("this is a test HOME!")
  })

  //This is for quiz attempt
  router.get("/:id", (req, res) => {
    res.send("this is a QUIZ ATTEMPT")
  })





  return router;
};
