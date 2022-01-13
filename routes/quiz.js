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

  // router.get("/attempt", (req, res) => {
  //   console.log(res)
  //   res.render("attemptquiz")
  // })
  router.get("/:id", (req, res) => {
    // console.log(req.params)
    const { id } = req.params
    db.query(`SELECT id, question, category, date FROM quiz WHERE id = ${id}`)
      .then(result => {
        const templateVars = { allData: result.rows }
        res.render("attemptquiz", templateVars)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    // res.render("attemptquiz")
  })

  router.post("/:id", (req, res) => {
    const answer = req.body.answer;
    const name = req.body.name;
    const id = req.params.id;
    const url = `${req.headers.host}/quiz/${id}`;
    db.query(`SELECT answer FROM quiz WHERE id = $1 AND answer ILIKE $2`, [id, answer])
    .then(result => {
      console.log(result)
      if (result.rowCount === 1) {
        db.query(`INSERT INTO results (quiz_id, result, name) VALUES ($1, $2, $3)`, [id,true, name]);
        db.query(`SELECT question, results.name FROM quiz JOIN results ON quiz_id = ${id} WHERE quiz.id = ${id}`)
        .then(info => {
          const templateVars = {allData: info.rows, textBox: url}
          res.render("attempt_pass", templateVars)
        })
      } else {
        db.query(`INSERT INTO results (quiz_id, result, name) VALUES ($1, $2, $3)`, [id,false, name]);
        db.query(`SELECT name, quiz.question FROM results JOIN quiz ON quiz.id = quiz_id WHERE quiz.id = ${id}`)
        .then(info => {
          const templateVars = {allData: info.rows, textBox: url}
          res.render("attempt_fail", templateVars)
        })
      }
    })
    .catch(err => {
      if (err) {
        res
          .status(500)
          .json({ error: err.message });
      }
    });
  })

  router.get("/attempt", (req, res) => {
    res.render("attempt_results")
  })

  //  router.post("/attempt", (req, res) => {
  //   const info = req.body.answer;
  //   res.render("attempt_results")
  // })





  //ADD SQL TO ADD INFO TO DATABASE

  return router;
};
