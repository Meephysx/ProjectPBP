const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Validasi input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Query untuk menyimpan user baru
    const query = `
      INSERT INTO Users (username, email, password_hash) 
      VALUES (?, ?, ?)
    `;
    const values = [username, email, passwordHash];

    // Eksekusi query menggunakan db.query
    db.query(query, values, (err, result) => {
      if (err) {
        // Tangani error duplikasi atau error lainnya
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "Username or Email is already registered" });
        }
        console.error("Error during user registration:", err.message);
        return res.status(500).json({ error: "Registration failed", details: err.message });
      }

      // Berhasil menambahkan user baru
      res.status(201).json({
        message: "User registered successfully",
        userId: result.insertId, // ID user yang baru dibuat
      });
    });
  } catch (err) {
    // Tangani error hashing atau error lainnya
    console.error("Unexpected error:", err.message);
    res.status(500).json({ error: "Registration failed", details: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validasi input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Periksa apakah email ada di database
    const query = "SELECT * FROM Users WHERE email = ?";
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error("Database error:", err.message);
        return res.status(500).json({ message: "Login failed", error: err.message });
      }

      // Jika user tidak ditemukan
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = results[0];

      // Verifikasi password
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate token
      const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Token valid selama 1 jam
      );

      // Berhasil login
      return res.status(200).json({
        message: "Login successful",
        token: token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const query = "SELECT * FROM Users";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching users:", err.message);
        return res.status(500).json({ error: "Failed to fetch users", details: err.message });
      }
      return res.status(200).json({ users: results });
    });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return res.status(500).json({ error: "An error occurred", details: err.message });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {    
    const query = "SELECT * FROM Users WHERE id = ?";
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error fetching user:", err.message);
        return res.status(500).json({ error: "Failed to fetch user", details: err.message });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ user: results[0] });
    });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return res.status(500).json({ error: "An error occurred", details: err.message });
  } 
};

