const express = require("express");
const router = express.Router();


module.exports = (db) => {
  router.post("/", async (req, res) => {
    const resultInfo = req.body;
    const resultValues = Object.values(resultInfo)
    try {
      await db.query('BEGIN')
      const entireQuery = "INSERT INTO results (quiz_id, result, name, results_url) VALUES ($1, $2, $3, $4)"
      await db.query({ text: entireQuery, values: resultValues })
      await db.query('COMMIT')
      const allIds = await db.query("SELECT id FROM results ORDER BY id DESC")
      const lastID = allIds.rows[0].id
      res.json({
        success: true,
        id: lastID
      })

    }
    catch (e) {
      console.log(e)
      await db.query('ROLLBACK')
      res.json({
        success: false,
        message: "Your answer was NOT recorded"
      })
    }

  });
  // attempt result by id
  router.get("/:id", async (req, res) => {
    const resultId = req.params.id;
    const resultInfo = await db.query(
      `SELECT  result, name FROM results WHERE id = ${resultId}`
    );

    res.render("attempt_results", { id: resultId, data: resultInfo.rows });
  });

  return router;
};
