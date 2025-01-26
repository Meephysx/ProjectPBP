const express = require("express");
const { registerUser, loginUser, getUsers } = require("../controllers/userControllers")
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/get-users", getUsers);

module.exports = router;

