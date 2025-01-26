const express = require("express");
const { registerUser, loginUser, getUsers, getUserById } = require("../controllers/userControllers")
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/get-users", getUsers);

router.get("/get-user/:id", getUserById);

module.exports = router;

