import { Router } from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addMember,
  removeMember,
} from "./project.controller";

import { authMiddleware } from "../../core/middleware/auth.middleware";
import { authorizationMiddleware } from "../../core/middleware/authorization.middleware";
import {validate} from "../../core/middleware/validate.middleware";
import { createProjectSchema, updateProjectSchema } from "./project.schema";

const router = Router();


// Projects
router.post("/",authMiddleware,authorizationMiddleware("super-admin"), validate(createProjectSchema), createProject);
router.get("/",authMiddleware, getProjects);
router.get("/:projectId", authMiddleware, getProjectById);
router.patch("/:projectId", authMiddleware, authorizationMiddleware("super-admin"), validate(updateProjectSchema), updateProject);
router.delete("/:projectId", authMiddleware, authorizationMiddleware("super-admin" ), deleteProject);

// Project members
router.post("/:projectId/members", authMiddleware, authorizationMiddleware("super-admin"), addMember);
router.delete("/:projectId/members/:userId", authMiddleware, authorizationMiddleware("super-admin"), removeMember);

export default router;