import express from "express";
import { registerService, logInService, changePasswordService, getAllUsersService, getMeService, updateUserService, deleteUserService, blockUserService, roleOfUserService , createuserServicebySuperAdmin  } from "./user.service";
import asyncHandler from "express-async-handler";
import { UserRole } from "./user.types";



export const registerController = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user = await registerService(req.body);
    res.status(201).json({
        status: "success",
        // data: user,
    });
});

export const logInController = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user = await logInService(req.body);
    res.status(200).json({
        status: "success",
        token: user.token,
    });
});

export const changePasswordController = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user = await changePasswordService(req.user.id, req.body);
    res.status(200).json({
        status: "success",
        data: user,
    });
});

export const getAllUsersController = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const {users, pagination} = await getAllUsersService(req.query);
    res.status(200).json({
        status: "success",
        results: users.length,
        pagination,
        data: users,
    });
});

export const getMeController = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user = await getMeService(req.user.id);
    res.status(200).json({
        status: "success",
        data: user,
    });
});  


export const updateUserController = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user = await updateUserService(req.user.id, req.body);
    res.status(200).json({
        status: "success",
        data: user,
    });
});  

export const deleteUserController = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user = await deleteUserService(req.params.id as string);
    res.status(200).json({
        status: "success",
        data: user,
    });
});

export const blockUserController = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user = await blockUserService(req.params.id as string);
    res.status(200).json({
        status: "success",
        data: user,
    });
});

export const roleOfUserController = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user = await roleOfUserService(req.params.id as string, req.body.role as UserRole);
    res.status(200).json({
        status: "success",
        data: user,
    });
});

export const createuserServicebySuperAdminController = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user = await createuserServicebySuperAdmin(req.body);
    res.status(200).json({
        status: "success",
        // data: user,
    });
});  


