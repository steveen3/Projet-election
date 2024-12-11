const express = require("express");
const router = express.Router();

const {
    getBureau,
    getBureauById,
    createBureau,
    updateBureau,
    deleteBureau,
  } = require("../service/Bureau");


  router.route("/Bureau").get(getBureau)
//router.get('/Bureau', getBureau)
router.route('/Bureau/:id').get(getBureauById)

//router.get('/Bureau/:id', getBureauById)
//arouter.post('/Bureau', createBureau)
router.route("/Bureau").post(createBureau)
router.put('/Bureau/:id', updateBureau)
router.delete('/Bureau/:id', deleteBureau) 


router.use("/", (req, res, next) => {
    res.status(404).json({ error: "page not found" });
  });
  module.exports = router;