const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/new", (req, res) => {
    res.render("createquiz")
  })
    router.post("/new", (req, res) => {
    const question = req.body.question;
    const answer = req.body.answer;
    const category = req.body.category;
     db.query(`INSERT INTO quiz (question, answer, category, date) VALUES ($1, $2, $3, current_timestamp)`, [question, answer, category])
    // db.query(`INSERT INTO quiz (question, answer, category) VALUES (${question}, ${answer}, ${category})`)
    .then ( result => {
      if (result) {
        res.redirect('/home')
      }
      // console.log(result);
    })
    .catch(err => {
      if (err) {
        return (
          res
            .status(500)
            .json({ error: err.message })
        );
      }
    });
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
