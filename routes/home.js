
const express = require('express');
const router = express.Router();
const moment = require('moment');
//This is out home page
module.exports = (db) => {
  router.get("/home", (req, res) => {
    //res.send("this is a test HOME!")
    console.log("DB QUERY IS RUNNING")
    db.query("SELECT question, category, date, id FROM quiz WHERE is_public = true ORDER BY id DESC")
      .then(result => {
        console.log(result.rows)
        // console.log("question", result)
        const templateVars = {
          allData: result.rows,
          moment
        }
        res.render("home", templateVars)
      })
  })

  //This is for quiz attempt
  router.get("/quiz", (req, res) => {
    res.render("attemptquiz")
  })

  //Endpoint for Search
  router.get("/search", async (req, res) => {
    const searchTerm = req.query.search
    const filteredQuiz = await db.query(`SELECT question, category, date FROM quiz WHERE is_public = true AND category LIKE '%${searchTerm}%' `)
    console.log("filteredQUIZ", filteredQuiz.rows)
    res.json(filteredQuiz.rows)

  })




  return router;
};
