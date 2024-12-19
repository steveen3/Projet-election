const db = require('../service/Resultat')
const express = require("express");
const router = express.Router();
router.get('/resultat', db.getresultat)
router.get('/resultat/:id', db.getresultatById)
router.post('/resultat', db.createresultat)
router.put('/resultat/:id', db.updateresultat)
router.delete('/resultat/:id', db.deleteresultat)
router.use("/", (req, res, next) => {
    res.status(404).json({ error: "page not found" });
  });
  module.exports = router;