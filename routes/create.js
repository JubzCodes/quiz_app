const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/create", (req, res) => {
    res.send("this is a test CREATE")
  })

  return router;
};
