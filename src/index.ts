import express, { Request, Response } from "express";
import PostService from "./services/PostService";
import "./instrument";

const app = express();

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(express.urlencoded({ extended: true }));

const postService = new PostService();

app.get("/", (req: Request, res: Response) => {
    res.render("home");
});

app.get("/posts", (req: Request, res: Response) => {
    const posts = postService.getAllPosts();
    res.render("posts", { posts });
});

app.post("/posts", (req: Request, res: Response) => {
    const post = postService.createPost(req.body);
    console.log(post);
    res.redirect(`/posts`);
});

app.get("/posts/new", (req: Request, res: Response) => {
    res.render("new-post");
});

app.get("/posts/:id/edit", (req: Request, res: Response) => {
    const post = postService.getPostById(parseInt(req.params.id, 10));
    if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
    }
    res.render("edit-post", { post });
});

app.get("/posts/:id", (req: Request, res: Response) => {
    const post = postService.getPostById(parseInt(req.params.id, 10));
    if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
    }
    res.render("post", { post });
});

app.post("/posts/:id", (req: Request, res: Response) => {
    const postId = parseInt(req.params.id, 10);
    const updatedData = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };

    const updatedPost = postService.updatePost(postId, updatedData);

    if (!updatedPost) {
        res.status(404).json({ error: "Post not found" });
        return;
    }

    res.redirect(`/posts/${postId}`);
});

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

import * as Sentry from "@sentry/node";

Sentry.startSpan(
    {
        op: "test",
        name: "My First Test Span"
    },
    () => {
        try {
            throw new Error("This is a test error");
        } catch (e) {
            Sentry.captureException(e);
        }
    }
);
