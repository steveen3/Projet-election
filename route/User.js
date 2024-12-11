const db = require('../service/User')
const express = require("express");
const router = express.Router();
router.get('/users', db.getUsers)
router.get('/users/:id', db.getUserById)
router.post('/users', db.createUser)
router.put('/users/:id', db.updateUser)
router.delete('/users/:id', db.deleteUser)
router.use("/", (req, res, next) => {
    res.status(404).json({ error: "page not found" });
  });
  module.exports = router;