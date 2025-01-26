const { Result, checkExact } = require("express-validator");
const db = require("../config/db");
const { createCheckSchema } = require("express-validator/lib/middlewares/schema");

exports.createPin = async (req, res) => {
    const { board_id, title, image_url, description } = req.body;

    if (!board_id || !title || !image_url) {
        return res.status(400).json({
            error: "Missing required fields",
            message: "board_id, title, and image_url are required"
        });
    }

    try {
        const query = `
        INSERT INTO Pins (board_id, title, image_url, description)
        VALUES (?, ?, ?, ?)
        `;
        const values = [board_id, title, image_url, description || null];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error("Error inserting pin:", err.message);
                return res.status(500).json({
                    error: "Failed to create pin",
                    details: err.message,
                });
            }

            return res.status(201).json({
                message: "Pin created successfully",
                pin: {
                    id: result.insertId,
                    board_id,
                    title,
                    image_url,
                    description: description || null,
                    create_at: new Date().toISOString(),
                },
            });
        });
    } catch (err) {
        console.error("Unexpected error:", err.message);
        return res.status(500).json({
            error: "An error occurred",
            details: err.message,
        });
    }
};

exports.getPinsByBoardId = async (req, res) => {
    const { board_id } = req.params;

    try {
        const query = `SELECT * FROM Pins WHERE board_id = ?`;
        db.query(query, [board_id], (err, results) => {
            if (err) {
                console.error("Error fetching pins:", err.message);
                return res.status(500).json({
                    error: "Failed to fetch pins",
                    details: err.message,
                });
            }

            return res.status(200).json({
                pins: results,
            });
        });
    } catch (err) {
        console.error("Unexpected error:", err.message);
        return res.status(500).json({
            error: "An error occurred",
            details: err.message,
        });
    }
};

exports.deletePin = async (req, res) => {
    const { pin_id } = req.params;

    try {
        const query = `DELETE FROM Pins WHERE id = ?`;
        db.query(query, [pin_id], (err, result) => {
            if (err) {
                console.error("Error deleting pin:", err.message);
                return res.status(500).json({
                    error: "Failed to delete pin",
                    details: err.message,
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Pin not found",
                });
            }

            return res.status(200).json({
                message: "Pin deleted successfully",
            });
        });
    } catch (err) {
        console.error("Unexpected error:", err.message);
        return res.status(500).json({
            error: "An error occurred",
            details: err.message,
        });
    }
}

exports.updatePin = async (req, res) => {
    const { pin_id } = req.params;
    const { board_id, title, image_url, description } = req.body;

    if (!board_id || !title || !image_url) {
        return res.status(400).json({
            error: "Missing required fields",
            message: "board_id, title, and image_url are required"
        });
    }

    try {
        const query = `
        UPDATE Pins
        SET board_id = ?, title = ?, image_url = ?, description = ?
        WHERE id = ?
        `;
        const values = [board_id, title, image_url, description || null, pin_id];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error("Error updating pin:", err.message);
                return res.status(500).json({
                    error: "Failed to update pin",
                    details: err.message,
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Pin not found",
                });
            }

            return res.status(200).json({
                message: "Pin updated successfully",
                pin: {
                    id: pin_id,
                    board_id,
                    title,
                    image_url,
                    description: description || null,
                    create_at: new Date().toISOString(),
                },
            });
        });
    } catch (err) {
        console.error("Unexpected error:", err.message);
        return res.status(500).json({
            error: "An error occurred",
            details: err.message,
        });
    }
}

exports.searchPins = async (req, res) => {
    const { keyword } = req.query;

    try {
        const query = `
        SELECT * FROM Pins
        WHERE title LIKE ?
        `;
        const values = [`%${keyword}%`];

        db.query(query, values, (err, results) => {
            if (err) {
                console.error("Error searching pins:", err.message);
                return res.status(500).json({
                    error: "Failed to search pins",
                    details: err.message,
                });
            }

            return res.status(200).json({
                pins: results,
            });
        });
    } catch (err) {
        console.error("Unexpected error:", err.message);
        return res.status(500).json({
            error: "An error occurred",
            details: err.message,
        });
    }
}

exports.sharePin = async (req, res) => {
    const { id } = req.params; // ID Pin yang ingin dibagikan
    const { platform } = req.body; // Platform untuk membagikan (opsional)
  
    try {
      // Cek apakah Pin dengan ID tersebut ada di database
      const queryCheck = "SELECT * FROM Pins WHERE id = ?";
      db.query(queryCheck, [id], (err, results) => {
        if (err) {
          console.error("Error checking pin:", err.message);
          return res.status(500).json({ error: "Failed to check pin", details: err.message });
        }
  
        if (results.length === 0) {
          return res.status(404).json({ error: "Pin not found" });
        }
  
        // Jika pin ditemukan
        const pin = results[0];
        const shareURL = `${req.protocol}://${req.get("host")}/pins/${pin.id}`;
  
        // Simulasi pembagian ke platform
        const responseMessage = platform
          ? `Pin shared on ${platform}: ${shareURL}`
          : `Pin shared successfully: ${shareURL}`;
  
        // Kirim respons ke pengguna
        return res.status(200).json({
          message: responseMessage,
          sharedURL: shareURL,
          pinDetails: {
            id: pin.id,
            title: pin.title,
            image_url: pin.image_url,
          },
        });
      });
    } catch (err) {
      console.error("Unexpected error:", err.message);
      return res.status(500).json({ error: "An unexpected error occurred", details: err.message });
    }
};


  


