import express from "express";
import cors from "cors";
import helmet from "helmet";
import pool from "./db.js";



const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";

server.use("/auth", authRoutes);
server.use("/posts", postsRoutes);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

pool.connect()
    .then(client => {
        client.release();
        console.log("✅ PostgreSQL Connected");

        server.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("❌ PostgreSQL connection failed:", err);
        process.exit(1);
    });