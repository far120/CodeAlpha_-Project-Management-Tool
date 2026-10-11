import { Router } from "express";
import {
  createTask,
  getProjectTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "./task.controller";

import { authMiddleware } from "../../core/middleware/auth.middleware";
import { authorizationMiddleware } from "../../core/middleware/authorization.middleware";
import { validate } from "../../core/middleware/validate.middleware";
import { createTaskSchema } from "./task.schema";



const router = Router();


// Tasks inside a project
router.post("/projects/:projectId/tasks", authMiddleware, authorizationMiddleware("super-admin", "admin"), validate(createTaskSchema), createTask);
router.get("/projects/:projectId/tasks", authMiddleware, getProjectTasks);

// Individual task
router.get("/tasks/:taskId", authMiddleware, getTaskById);
router.patch("/tasks/:taskId", authMiddleware, authorizationMiddleware("super-admin", "admin"), updateTask);
router.delete("/tasks/:taskId", authMiddleware, authorizationMiddleware("super-admin", "admin"), deleteTask);

export default router;