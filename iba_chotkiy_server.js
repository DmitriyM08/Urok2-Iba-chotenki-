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

app.get("/timestamp", (req, res) => {
    res.json({ timestamp: getTimeDate() });
});

app.get("/posts/:id", (req, res) => {
    const idpost = +req.params.id
    if (isNaN(idpost)) {
        res.status(400).json("id must be an int");
        return;
    }
    const post = posts.find((pr) => {
        return pr.id === idpost
    })
    if (post === undefined) {
        res.status(404).json("post not found")
        return;
    }
    res.json(post)
})

app.get("/posts", (req, res) => {
    let skip = 0
    let take = null

    if (req.query.skip !== undefined) {
        skip = Number(req.query.skip)
        if (isNaN(skip)) {
            return res.status(400).json({ error: "skip must be a number" })
        }
    }

    if (req.query.take !== undefined) {
        take = Number(req.query.take)
        if (isNaN(take)) {
            return res.status(400).json({ error: "take must be a number" })
        }
    }

    let result = posts.slice(skip)
    if (take !== null && take > 0) {
        result = result.slice(0, take)
    }

    res.json(result)
})


app.listen(PORT, HOST, () => {
    console.log(`Server started on http://${HOST}:${PORT}`);
});