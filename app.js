const express = require("express");
const axios = require("axios");

const app = express();

const PORT = 3000;

// Allows Express to read JSON request bodies
app.use(express.json());


// ========================================
// HOME ROUTE
// ========================================

app.get("/", (req, res) => {

    res.json({
        message: "API Engineering Application is running"
    });

});


// ========================================
// GET ALL POSTS
// ========================================

app.get("/api/posts", async (req, res) => {

    try {

        const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts"
        );

        res.status(200).json(response.data);

    } catch (error) {

        console.error("Error:", error.message);

        res.status(500).json({
            error: "Failed to fetch posts"
        });

    }

});


// ========================================
// GET SINGLE POST
// ========================================

app.get("/api/posts/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/posts/${id}`
        );

        res.status(200).json(response.data);

    } catch (error) {

        console.error("Error:", error.message);

        if (error.response) {

            res.status(error.response.status).json({
                error: "External API request failed"
            });

        } else {

            res.status(500).json({
                error: "Internal server error"
            });

        }

    }

});


// ========================================
// CREATE POST
// ========================================

app.post("/api/posts", async (req, res) => {

    try {

        const { title, body, userId } = req.body;

        // Validate input
        if (!title || !body || !userId) {

            return res.status(400).json({
                error: "title, body and userId are required"
            });

        }

        const response = await axios.post(
            "https://jsonplaceholder.typicode.com/posts",
            {
                title: title,
                body: body,
                userId: userId
            }
        );

        res.status(201).json(response.data);

    } catch (error) {

        console.error("Error:", error.message);

        res.status(500).json({
            error: "Failed to create post"
        });

    }

});


// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});