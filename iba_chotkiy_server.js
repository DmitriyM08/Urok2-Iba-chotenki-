const path = require("path")
const fs = require("fs")
const express = require('express')
const moment = require("moment");

const postPath = path.join(__dirname, "post.json")
const posts = JSON.parse(fs.readFileSync(postPath, "utf-8"))

const app = express();

const PORT = 8000;
const HOST = "localhost";

app.get("/posts", (req, res) => {
    res.status(200).json(posts)
})

app.listen(PORT, HOST, () => {
    console.log(`Server started on http://${HOST}:${PORT}`);
});