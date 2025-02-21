const pool = require("../db/connection");

// ✅ Get all posts (No authentication required)
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await pool.query("SELECT * FROM blogs ORDER BY created_at DESC");
        res.json(posts.rows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts", error: error.message });
    }
};

// ✅ Get single post details & 3 similar posts from the same category
exports.getPostDetails = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch post details
        const postQuery = await pool.query("SELECT * FROM blogs WHERE id = $1", [id]);

        if (postQuery.rows.length === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        const post = postQuery.rows[0];

        // Fetch 3 similar posts based on category
        const similarPostsQuery = await pool.query(
            "SELECT * FROM blogs WHERE category = $1 AND id != $2 ORDER BY RANDOM() LIMIT 3",
            [post.category, id]
        );

        res.json({ post, similarPosts: similarPostsQuery.rows });
    } catch (error) {
        res.status(500).json({ message: "Error fetching post details", error: error.message });
    }
};

// ✅ Filter posts by category or search by title
exports.filterPosts = async (req, res) => {
    try {
        const { category, title } = req.query;
        let query = "SELECT * FROM blogs WHERE 1=1";
        let values = [];

        if (category) {
            values.push(category);
            query += ` AND category = $${values.length}`;
        }

        if (title) {
            values.push(`%${title}%`);
            query += ` AND LOWER(title) LIKE LOWER($${values.length})`;
        }

        const filteredPosts = await pool.query(query, values);
        res.json(filteredPosts.rows);
    } catch (error) {
        res.status(500).json({ message: "Error filtering posts", error: error.message });
    }
};
