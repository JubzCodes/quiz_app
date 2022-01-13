
const express = require('express');
const router = express.Router();
//This is out home page
module.exports = (db) => {
  router.get("/home", (req, res) => {
    //res.send("this is a test HOME!")
    // console.log("DB QUERY IS RUNNING")
    db.query("SELECT question, category, date FROM quiz")
      .then(result => {
        // console.log(result.rows)
        // console.log("question", result)
        const templateVars = { allData: result.rows }
        res.render("home", templateVars)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  //This is for quiz attempt
  // router.get("/quiz", (req, res) => {
  //   res.render("attemptquiz")
  // })





  return router;
};
