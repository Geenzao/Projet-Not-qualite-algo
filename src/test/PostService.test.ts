import { describe, it, expect } from "vitest";
import PostService from "../services/PostService";
import Post from "../type/Post";

describe("PostService", () => {
    const postService = new PostService();
    describe("getPostById", () => {
        it("should return the correct post when it exists", () => {
            const postId = 1;
            const expectedPost: Post = {
                id: postId,
                title: "Tener quia summa.",
                content: "Tibi auctus ademptio adhaero vulticulus victus deficio amor. Utpote quos ars deludo. Temptatio aegrotatio cresco sed.",
                author: "Leona Gislason",
                createdAt: "2025-02-16T04:29:37.287Z"
            };

            const result = postService.getPostById(postId);
            expect(result).toEqual(expectedPost);
        });

        it("should return null when the post does not exist", () => {
            const postId = -1;
            const result = postService.getPostById(postId);
            expect(result).toBeNull();
        });
    });

    describe("createPost", () => {
        it("should create a new post and return it", () => {
            const newPost: Omit<Post, "id" | "createdAt"> = {
                title: "New Post",
                content: "This is a new post",
                author: "New Author"
            };

            const result = postService.createPost(newPost);
            expect(result).toHaveProperty("id");
            expect(result.title).toBe(newPost.title);
            expect(result.content).toBe(newPost.content);
            expect(result.author).toBe(newPost.author);
            expect(result.createdAt).toBeDefined();
        });
    });

    describe("updatePost", () => {
        it("should update an existing post and return it", () => {
            const postId = 1;
            const updatedData = {
                title: "Updated Post",
                content: "This post has been updated",
                author: "Test Author"
            };

            const result = postService.updatePost(postId, updatedData);
            expect(result).toBeDefined();
            expect(result?.title).toBe(updatedData.title);
            expect(result?.content).toBe(updatedData.content);
        });

        it("should return null when trying to update a non-existent post", () => {
            const postId = 999;
            const updatedData = {
                title: "Updated Post",
                content: "This post has been updated",
                author: "Test Author"
            };

            const result = postService.updatePost(postId, updatedData);
            expect(result).toBeNull();
        });
    });
});
