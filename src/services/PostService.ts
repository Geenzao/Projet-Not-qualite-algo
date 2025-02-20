import data from "../data.json";
import Post from "../type/Post";

class PostService {
    private posts: Post[];

    constructor() {
        this.posts = [...data.posts];
    }

    getAllPosts(): Post[] {
        return this.posts;
    }

    getPostById(id: number): Post | null {
        const post = this.posts.find((p) => p.id === id);
        return post || null;
    }

    createPost(postData: Omit<Post, "id" | "createdAt" | "updatedAt">): Post {
        const newPost: Post = {
            id: this.posts.length + 1,
            title: postData.title,
            content: postData.content,
            author: postData.author,
            createdAt: new Date().toISOString()
        };
        this.posts.push(newPost);
        return newPost;
    }

    updatePost(id: number, postData: Omit<Post, "id" | "createdAt" | "updatedAt">): Post | null {
        const index = this.posts.findIndex((post) => post.id === id);
        if (index === -1) return null;

        this.posts[index] = {
            ...this.posts[index],
            title: postData.title,
            content: postData.content,
            author: postData.author,
            updatedAt: new Date().toISOString()
        };

        return this.posts[index];
    }
}

export default PostService;
