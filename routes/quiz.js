const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/new", (req, res) => {
    res.render("createquiz")
  })

  router.get("/attempt", (req, res) => {
    res.render("attempt_results")
  })
  router.get("/:id", (req, res) => {
    console.log(req.params)
    const { id } = req.params
    res.send(`ID ${id}`)
  })

  //ADD SQL TO ADD INFO TO DATABASE

  return router;
};
