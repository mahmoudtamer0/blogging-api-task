import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";

export const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const findUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (findUser.rows.length > 0) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            "INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING id, email, name",
            [email, name, hashedPassword]
        );


        return res.status(201).json({ success: true, message: "User created successfully" });

    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const findUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        const user = findUser.rows[0];

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);



        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(200).json({ success: true, message: "User logged in successfully", token, user });

    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};