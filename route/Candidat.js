const express = require("express");
const router = express.Router();

const {
    getCandidat,
    getCandidatById,
    createCandidat,
    updateCandidat,
    deleteCandidat,
  } = require("../service/Candidat");


  router.route("/Candidat").get(getCandidat)

router.route('/Candidat/:id').get(getCandidatById)


router.route("/Candidat").post(createCandidat)
router.put('/Candidat/:id', updateCandidat)
router.delete('/Candidat/:id', deleteCandidat) 


router.use("/", (req, res, next) => {
    res.status(404).json({ error: "page not found" });
  });
  module.exports = router;