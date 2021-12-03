import { Express, Request, Response } from "express";
import { validateRequest, requiresUser } from "../middleware";
import { createPostSchema, deletePostSchema, updatePostSchema } from "../schema/post.schema";
import { createUserSchema, createUserSessionSchema } from "../schema/user.schema";
import { createPostHandler, deletePostHandler, getPostHandler, updatePostHandler } from "./controller/post.controller";
import { createUserSessionHandler, getUserSessionHandler, invalidateUserSessionHandler } from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";

export default function (app: Express) {

    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

    // Register user
    // POST /api/user 
    app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

    // Login
    // POST /api/sessions
    app.post("/api/sessions", validateRequest(createUserSessionSchema), createUserSessionHandler);

    // Get the user's sessions
    // GET /api/sessions
    app.get("/api/sessions", requiresUser, getUserSessionHandler);

    // Logout
    // Delete /api/sessions
    app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);


    // Create a post
    app.post("/api/posts",
        [requiresUser, validateRequest(createPostSchema)],
        createPostHandler  
    );
    
     
    // Update a post
    app.put(
        "/api/posts/:postId",
        [requiresUser, validateRequest(updatePostSchema)],
        updatePostHandler
    );

    // Get a post
    app.get("/api/posts/:postId", getPostHandler);

    // Delete a post
    app.delete(
        "/api/posts/:postId",
        [requiresUser, validateRequest(deletePostSchema)],
        deletePostHandler
    )
} 