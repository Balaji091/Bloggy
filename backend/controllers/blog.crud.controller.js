
const pool = require('../db/connection');
const { cloudinary } = require('../utils/upload');

//  Add Post (With Image Upload)
exports.addPost = async (req, res) => {
    try {
        const { title, category, description } = req.body;
        const user_email = req.user.email;

        //  Check if image is uploaded
        if (!req.file) {
            return res.status(400).json({ message: "Image is required for creating a post" });
        }

        //  Upload image to Cloudinary
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }).end(req.file.buffer);
        });

        const image_url = result.secure_url;

        //  Insert into DB
        const newPost = await pool.query(
            "INSERT INTO blogs (title, category, description, image_url, user_email) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [title, category, description, image_url, user_email]
        );

        res.status(201).json({ message: "Post created successfully", post: newPost.rows[0] });
    } catch (error) {
        res.status(500).json({ message: "Error creating post", error: error.message });
    }
};


//  View Single Post Details
exports.getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await pool.query("SELECT * FROM blogs WHERE id = $1", [id]);

        if (post.rows.length === 0) return res.status(404).json({ message: "Post not found" });

        res.json(post.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error fetching post", error: error.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, category, description, image } = req.body;
      const user_email = req.user.email;
  
      // Check if the post exists and if the user is the owner
      const post = await pool.query("SELECT * FROM blogs WHERE id = $1", [id]);
      if (post.rows.length === 0) 
        return res.status(404).json({ message: "Post not found" });
  
      if (post.rows[0].user_email !== user_email)
        return res.status(403).json({ message: "Unauthorized to update this post" });
  
      // Use the new image URL if provided, otherwise retain the current one.
      const imageUrl = image ? image : post.rows[0].image_url;
  
      // Update the post with the new values
      await pool.query(
        "UPDATE blogs SET title = $1, category = $2, description = $3, image_url = $4 WHERE id = $5",
        [title, category, description, imageUrl, id]
      );
  
      res.json({ message: "Post updated successfully", imageUrl });
    } catch (error) {
      res.status(500).json({ message: "Error updating post", error: error.message });
    }
  };
  


// Delete Post (Only Author Can Delete)
exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const user_email = req.user.email;

        const post = await pool.query("SELECT * FROM blogs WHERE id = $1", [id]);
        if (post.rows.length === 0) return res.status(404).json({ message: "Post not found" });

        if (post.rows[0].user_email !== user_email)
            return res.status(403).json({ message: "Unauthorized to delete this post" });

        await pool.query("DELETE FROM blogs WHERE id = $1", [id]);
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting post", error: error.message });
    }
};


//  View All Posts of Logged-in User
exports.getUserPosts = async (req, res) => {
    try {
        const user_email = req.user.email;
        const posts = await pool.query("SELECT * FROM blogs WHERE user_email = $1", [user_email]);

        res.json(posts.rows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user posts", error: error.message });
    }
};

//  Filter Posts by Category or Title
exports.filterPosts = async (req, res) => {
    try {
        const { category } = req.query;
        let query = "SELECT * FROM blogs WHERE 1=1";
        let values = [];

        if (category) {
            query += " AND category ILIKE $1";
            values.push(`%${category}%`);
        }
      
        const posts = await pool.query(query, values);
        res.json(posts.rows);
    } catch (error) {
        res.status(500).json({ message: "Error filtering posts", error: error.message });
    }
};
