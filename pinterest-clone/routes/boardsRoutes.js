const express = require("express");
const { getBoards, getBoardById, createBoard, updateBoard, deleteBoard }  = require("../controllers/boardsControllers")
const router = express.Router();

router.get("/get-boards", getBoards);
router.get("/get-board/:board_id", getBoardById);
router.post("/create-board", createBoard);
router.put("/update-board/:board_id", updateBoard);
router.delete("/delete-board/:board_id", deleteBoard);

module.exports = router;