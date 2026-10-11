import { Router } from "express";
import userRoutes from "../modules/users/user.routes";
import auditLogRoutes from "../modules/auditLog/auditLog.routes";
import projectRoutes from "../modules/project/project.routes";
import taskRoutes from "../modules/task/task.routes";
import commentRoutes from "../modules/comment/comment.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/logs", auditLogRoutes);
router.use("/", taskRoutes);
router.use("/", commentRoutes);
router.use("/projects", projectRoutes);
router.use("/tasks", taskRoutes);
router.use("/comments", commentRoutes);


router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy",
  });
});

export default router;