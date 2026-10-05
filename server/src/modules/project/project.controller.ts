import express from "express";
import asyncHandler from "express-async-handler";
import { createProjectService,
  getProjectsService,
  getProjectByIdService,
  updateProjectService,
  deleteProjectService,
  addMemberService,
removeMemberService,
} from "./project.service";


export const createProject = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const project = await createProjectService(req.user._id, req.body);
    res.status(201).json({
        status: "success",
        data: project,
    });
});
export const getProjects = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const projects = await getProjectsService();
    res.status(200).json({
        status: "success",
        data: projects,
    });
});

export const getProjectById = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const project = await getProjectByIdService(req.params.projectId as string);
    res.status(200).json({
        status: "success",
        data: project,
    });
});

export const updateProject = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const project = await updateProjectService(req.params.projectId as string, req.body);
    res.status(200).json({
        status: "success",
        data: project,
    });
});

export const deleteProject = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const project = await deleteProjectService(req.params.projectId as string);
    res.status(200).json({
        status: "success",
        data: project,
    });
});

export const addMember = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const project = await addMemberService(req.params.projectId as string, req.body.userId as string);
    res.status(200).json({
        status: "success",
        data: project,
    });
});

export const removeMember = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const project = await removeMemberService(req.params.projectId as string, req.params.userId as string);
    res.status(200).json({
        status: "success",
        data: project,
    });
});
