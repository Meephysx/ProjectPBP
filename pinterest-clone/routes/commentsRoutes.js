const express = require("express");
const { createComment, getCommentsByPinId, deleteComment, updateComment } = require("../controllers/commentsControllers");
const router = express.Router();


router.post("/create-comment", createComment);
router.get("/get-comments/:pin_id", getCommentsByPinId);
router.delete("/delete-comment/:comment_id", deleteComment);
router.put("/update-comment/:comment_id", updateComment);


module.exports = router;