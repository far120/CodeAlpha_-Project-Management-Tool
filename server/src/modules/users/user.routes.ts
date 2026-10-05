import { Router } from "express";
import { registerController, logInController, changePasswordController, getAllUsersController, getMeController, updateUserController, deleteUserController, blockUserController, roleOfUserController , createuserServicebySuperAdminController  } from "./user.controller";
import { validate } from "../../core/middleware/validate.middleware";
import { registerSchema, loginSchema, changePasswordSchema, updateUseSchema, roleOfUserSchema, deleteUserSchema, blockUserSchema , createuserServicebySuperAdminSchema } from "./user.schema";
import { authMiddleware } from "../../core/middleware/auth.middleware";
import { authorizationMiddleware } from "../../core/middleware/authorization.middleware";


const router = Router();

router.post("/register", validate(registerSchema), registerController);
router.post("/login", validate(loginSchema), logInController);
router.post("/change-password",authMiddleware, validate(changePasswordSchema), changePasswordController);
router.get("/all-users", authMiddleware,authorizationMiddleware("super-admin", "admin"), getAllUsersController);
router.get("/me", authMiddleware, getMeController);
router.put("/update/me",authMiddleware,validate(updateUseSchema), updateUserController);
router.delete("/delete/:id", authMiddleware, authorizationMiddleware("super-admin"), validate(deleteUserSchema), deleteUserController);
router.put("/block/:id", authMiddleware, authorizationMiddleware("super-admin"), validate(blockUserSchema), blockUserController);
router.put("/role/:id", authMiddleware, authorizationMiddleware("super-admin"), validate(roleOfUserSchema), roleOfUserController);
router.post("/create-user", authMiddleware, authorizationMiddleware("super-admin"), validate(createuserServicebySuperAdminSchema), createuserServicebySuperAdminController);

export default router;