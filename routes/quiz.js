const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // create new quiz
  router.get("/new", (req, res) => {
    res.render("createquiz");
  });

  //POST request for new quiz
  router.post("/new", (req, res) => {
    const question = req.body.question;
    const answer = req.body.answer;
    const category = req.body.category;
    db.query(`INSERT INTO quiz (question, answer, category, date) VALUES ($1, $2, $3, current_timestamp)`, [question, answer, category])
      .then(result => {
        if (result) {
          res.redirect('/home');
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
  });

  // quiz attempt: TODO?
  router.get("/attempt", (req, res) => {
    res.render("attempt_results");
  });

  // get all quiz answer
  router.get("/answers", async (req, res) => {
    const quizzInfo = await db.query(`SELECT answer FROM quiz`);


    res.json(quizzInfo.rows);
  });

  // get quiz answer
  router.get("/answers/:id", async (req, res) => {
    const quizzId = req.params.id;

    if (!quizzId) req.json({ message: "missing ID" });

    const quizzInfo = await db.query(
      `SELECT answer FROM quiz WHERE id=${quizzId}`
    );

    res.json(quizzInfo.rows[0]);
  });

  // attempt quiz by id
  router.get("/:id", async (req, res) => {
    const quizzId = req.params.id;
    const quizzInfo = await db.query(
      `SELECT  question, category, date FROM quiz WHERE id = ${quizzId}`
    );

    res.render("attemptquiz", { id: quizzId, data: quizzInfo.rows });
  });

  return router;
};
