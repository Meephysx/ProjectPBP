const db = require("../config/db");

exports.createBoard = async (req, res) => {
    const { user_id, name, description } = req.body;

    if (!user_id || !name) {
        return res.status(400).json({
            error: "Missing required fields",
            message: "user_id and name are required"
        });
    }

    try {
        const query = `
        INSERT INTO Boards (user_id, name, description)
        VALUES (?, ?, ?)
        `;
        const values = [user_id, name, description || null];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error("Error inserting board:", err.message);
                return res.status(500).json({
                    error: "Failed to create board",
                    details: err.message,
                });
            }

            return res.status(201).json({
                message: "Board created successfully",
                board: {
                    id: result.insertId,
                    user_id,
                    name,
                    description: description || null,
                    created_at: new Date().toISOString(),
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

exports.getBoards = async (req, res) => {
    try {
        const query = "SELECT * FROM Boards";
        db.query(query, (err, results) => {
            if (err) {
                console.error("Error fetching boards:", err.message);
                return res.status(500).json({
                    error: "Failed to fetch boards",
                    details: err.message,
                });
            }

            return res.status(200).json({
                boards: results,
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

exports.updateBoard = async (req, res) => {
    const { board_id } = req.params;
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({
            error: "Missing required fields",
            message: "name is required"
        });
    }

    try {
        const query = `
        UPDATE Boards
        SET name = ?, description = ?
        WHERE id = ?
        `;
        const values = [name, description || null, board_id];

        db.query(query, values, (err, result) => {
            if (err) {      
                console.error("Error updating board:", err.message);
                return res.status(500).json({
                    error: "Failed to update board",
                    details: err.message,
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Board not found",
                });
            }

            return res.status(200).json({
                message: "Board updated successfully",
                board: {
                    id: board_id,
                    name,
                    description: description || null,
                    updated_at: new Date().toISOString(),
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

exports.deleteBoard = async (req, res) => {
    const { board_id } = req.params;

    try {
        const query = "DELETE FROM Boards WHERE id = ?";
        db.query(query, [board_id], (err, result) => {
            if (err) {
                console.error("Error deleting board:", err.message);
                return res.status(500).json({
                    error: "Failed to delete board",
                    details: err.message,
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Board not found",
                });
            }

            return res.status(200).json({
                message: "Board deleted successfully",
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

exports.getBoardById = async (req, res) => {
    const { board_id } = req.params;

    try {
        const query = "SELECT * FROM Boards WHERE id = ?";
        db.query(query, [board_id], (err, results) => {
            if (err) {
                console.error("Error fetching board:", err.message);
                return res.status(500).json({
                    error: "Failed to fetch board",
                    details: err.message,
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    error: "Board not found",
                });
            }

            const board = results[0];

            return res.status(200).json({
                board,
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