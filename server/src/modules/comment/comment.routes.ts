import { Router } from "express";
import {
  createComment,
  getTaskComments,
  deleteComment,
  updateComments
} from "./comment.controller";

import { authMiddleware } from "../../core/middleware/auth.middleware";
import { authorizationMiddleware } from "../../core/middleware/authorization.middleware";
import {validate} from "../../core/middleware/validate.middleware";
import { createCommentSchema, updateCommentSchema } from "./comment.schema";


const router = Router();

  

// Comments inside a task
router.post("/tasks/:taskId/comments", authMiddleware, validate(createCommentSchema), createComment);
router.get("/tasks/:taskId/comments", authMiddleware, getTaskComments);

// individual comment operations
router.patch("/comments/:commentId", authMiddleware, validate(updateCommentSchema),updateComments);
router.delete("/comments/:commentId", authMiddleware, deleteComment);


export default router;