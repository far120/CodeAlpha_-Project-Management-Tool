import express from "express";
import asyncHandler from "express-async-handler";
import { createTaskService,
  getTasksService,
  getTaskByIdService,
  updateTaskService,
  deleteTaskService,
} from "./task.service";

export const createTask = asyncHandler(async (req: express.Request, res: express.Response) => {
    
    const task = await createTaskService(req.params.projectId as string, req.user.id, req.body);
    res.status(201).json({
        status: "success",
        data: task,
    });
});

export const getProjectTasks = asyncHandler(async (req: express.Request, res: express.Response) => {
    const tasks = await getTasksService(req.params.projectId as string);
    res.status(200).json({
        status: "success",
        data: tasks,
    });
});

export const getTaskById = asyncHandler(async (req: express.Request, res: express.Response) => {
    const task = await getTaskByIdService(req.params.taskId as string);
    res.status(200).json({
        status: "success",
        data: task,
    });
});

export const updateTask = asyncHandler(async (req: express.Request, res: express.Response) => {
    const task = await updateTaskService(req.params.taskId as string, req.body);
    res.status(200).json({
        status: "success",
        data: task,
    });
});

export const deleteTask = asyncHandler(async (req: express.Request, res: express.Response) => {
    const task = await deleteTaskService(req.params.taskId as string);
    res.status(200).json({
        status: "success",
        data: task,
    });
});

