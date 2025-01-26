const db = require("../config/db");

// Controller untuk membuat komentar
exports.createComment = async (req, res) => {
  const { pin_id, user_id, comment_text } = req.body;

  // Validasi input
  if (!pin_id || !user_id || !comment_text) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Periksa apakah user_id ada di tabel users sebelum menambahkan komentar
    const checkUserQuery = "SELECT id FROM users WHERE id = ?";
    db.query(checkUserQuery, [user_id], (err, results) => {
      if (err) {
        console.error("Error checking user existence:", err.message);
        return res.status(500).json({ error: "Database error", details: err.message });
      }

      if (results.length === 0) {
        return res.status(400).json({ error: "Invalid user_id, user does not exist" });
      }

      // Jika user ditemukan, lanjutkan dengan memasukkan komentar
      const insertCommentQuery =
        "INSERT INTO Comments (pin_id, user_id, comment_text) VALUES (?, ?, ?)";
      const values = [pin_id, user_id, comment_text];

      db.query(insertCommentQuery, values, (err, result) => {
        if (err) {
          console.error("Error creating comment:", err.message);
          return res.status(500).json({
            error: "Failed to create comment",
            details: err.message,
          });
        }

        return res.status(201).json({
          message: "Comment created successfully",
          comment: {
            id: result.insertId,
            pin_id,
            user_id,
            comment_text,
            created_at: new Date(),
          },
        });
      });
    });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    res.status(500).json({ error: "An error occurred", details: err.message });
  }
};


exports.getCommentsByPinId = async (req, res) => {
  const { pin_id } = req.params;

  try {
    const query = "SELECT * FROM Comments WHERE pin_id = ?";
    db.query(query, [pin_id], (err, results) => {
      if (err) {
        console.error("Error fetching comments:", err.message);
        return res.status(500).json({ error: "Failed to fetch comments", details: err.message });
      }

      return res.status(200).json({ comments: results });
    });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return res.status(500).json({ error: "An error occurred", details: err.message });
  }
}; 

exports.deleteComment = async (req, res) => {
  const { comment_id } = req.params;

  try {
    const query = "DELETE FROM Comments WHERE id = ?";
    db.query(query, [comment_id], (err, result) => {
      if (err) {
        console.error("Error deleting comment:", err.message);
        return res.status(500).json({ error: "Failed to delete comment", details: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Comment not found" });
      }

      return res.status(200).json({ message: "Comment deleted successfully" });
    });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return res.status(500).json({ error: "An error occurred", details: err.message });
  }
};

exports.updateComment = async (req, res) => {
  const { comment_id } = req.params;
  const { comment_text } = req.body;

  try {
    const query = "UPDATE Comments SET comment_text = ? WHERE id = ?";
    db.query(query, [comment_text, comment_id], (err, result) => {
      if (err) {
        console.error("Error updating comment:", err.message);
        return res.status(500).json({ error: "Failed to update comment", details: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Comment not found" });
      }

      return res.status(200).json({ message: "Comment updated successfully" });
    });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return res.status(500).json({ error: "An error occurred", details: err.message });
      }
};


