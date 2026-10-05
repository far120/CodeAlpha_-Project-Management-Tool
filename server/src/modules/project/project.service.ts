import  Project  from "./project.model";
import Task from "../task/task.model";
import Comment from "../comment/comment.model";
import User from "../users/user.model";
import AppError from "../../core/errors/AppError";
import APIFeatures from "../../core/utils/apiFeatures"
import { IProject } from "./project.types";


export const createProjectService = async (userId: string, project: IProject) => {
    const newProject = await Project.create({
        ...project,
        owner: userId,
        members: [userId],
    });
    return newProject;
}




export const getProjectsService = async () => {
    //use APIFeatures to filter, sort, and paginate the projects
    console.log("getProjectsService called");
    const apiFeatures = new APIFeatures(Project.find(), {})
        .filter()
        .sort()
        .search(["name", "description"]);
    await apiFeatures.paginate();
    const projects = await apiFeatures.query;
    return projects;
}

export const getProjectByIdService = async (projectId: string) => {
    const project = await Project.findById(projectId);
    if (!project) {
        throw new AppError("Project not found", 404);
    }
    return project;
}

export const updateProjectService = async (projectId: string, project: IProject) => {
    const updateProject = await Project.findByIdAndUpdate(projectId, project, { new: true });
    if (!updateProject) {
        throw new AppError("Project not found", 404);
    }
    return updateProject;
}

export const deleteProjectService = async (projectId: string) => {
    await Comment.deleteMany({
        task: { $in: (await Task.find({ project: projectId })).map(t => t._id) }
    });
      await Task.deleteMany({
    project: projectId,
  });
    const deleteProject = await Project.findByIdAndDelete(projectId);
    if (!deleteProject) {
        throw new AppError("Project not found", 404);
    }
    return deleteProject;
}

export const addMemberService = async (projectId: string, userId: string) => {
    const project = await Project.findById(projectId);
    if (!project) {
        throw new AppError("Project not found", 404);
    }
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError("User not found", 404);
    }
    if (user.isBlocked) {
        throw new AppError("User is not active", 400);
    }
    if (project.members.includes(userId as any)) {
        throw new AppError("User is already a member of the project", 400);
    }
    project.members.push(userId as any);
    await project.save();
    return project;
}

export const removeMemberService = async (projectId: string, userId: string) => {
    const project = await Project.findById(projectId);
    if (!project) {
        throw new AppError("Project not found", 404);
    }
    if (!project.members.includes(userId as any)) {
        throw new AppError("User is not a member of the project", 400);
    }
    project.members = project.members.filter(member => member.toString() !== userId);
    await project.save();
    return project;
}


