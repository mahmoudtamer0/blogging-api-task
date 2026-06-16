import pool from "../db.js";

export const getAllPosts = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT posts.id, posts.title, posts.content, posts."createdAt",
                users.id AS "authorId", users.name AS "authorName", users.email AS "authorEmail"
         FROM posts
         JOIN users ON posts."authorId" = users.id
         ORDER BY posts."createdAt" DESC`
        );

        return res.status(200).json({ success: true, posts: result.rows });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const createPost = async (req, res) => {
    try {
        console.log(req.user);
        const { title, content } = req.body;
        const authorId = req.user.id;

        const result = await pool.query(
            `INSERT INTO posts (title, content, "authorId") VALUES ($1, $2, $3) 
         RETURNING id, title, content, "authorId", "createdAt"`,
            [title, content, authorId]
        );

        return res.status(201).json({ success: true, post: result.rows[0] });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const userId = req.user.id;

        const result = await pool.query(
            `UPDATE posts SET title = $1, content = $2 WHERE id = $3 AND "authorId" = $4
         RETURNING id, title, content, "authorId", "createdAt"`,
            [title, content, id, userId]
        );
        const post = result.rows[0];

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        return res.status(200).json({ success: true, post: result.rows[0] });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const findPostAndDelete = await pool.query(`DELETE FROM posts WHERE id = $1 AND "authorId" = $2 RETURNING id`, [id, userId]);

        const post = findPostAndDelete.rows[0];

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }


        return res.status(200).json({ success: true, message: "Post deleted successfully" });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};