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
    await newProject.populate("owner", "firstName lastName email avatar role");
    await newProject.populate("members", "firstName lastName email avatar role");
    return newProject;
}

export const getProjectsService = async (userId: string) => {
    //use APIFeatures to filter, sort, and paginate the projects
    const query = Project.find({ $or: [{ owner: userId }, { members: userId }] })
        .populate("owner", "firstName lastName email avatar role")
        .populate("members", "firstName lastName email avatar role");
    const apiFeatures = new APIFeatures(query, {})
        .filter()
        .sort()
        .search(["name", "description"]);
    await apiFeatures.paginate();
    const projects = await apiFeatures.query;
    
    return projects;
}

export const getProjectByIdService = async (projectId: string) => {
    const project = await Project.findById(projectId)
        .populate("owner", "firstName lastName email avatar role")
        .populate("members", "firstName lastName email avatar role");
    if (!project) {
        throw new AppError("Project not found", 404);
    }
    return project;
}

export const updateProjectService = async (projectId: string, project: IProject) => {
    const updateProject = await Project.findByIdAndUpdate(projectId, project, { new: true })
        .populate("owner", "firstName lastName email avatar role")
        .populate("members", "firstName lastName email avatar role");
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
    const alreadyMember = project.members.some((m: any) => (m._id ? m._id.toString() : m.toString()) === userId.toString());
    if (alreadyMember) {
        throw new AppError("User is already a member of the project", 400);
    }
    project.members.push(userId as any);
    await project.save();
    await project.populate("owner", "firstName lastName email avatar role");
    await project.populate("members", "firstName lastName email avatar role");
    return project;
}

export const removeMemberService = async (projectId: string, userId: string) => {
    const project = await Project.findById(projectId);
    if (!project) {
        throw new AppError("Project not found", 404);
    }
    const isMember = project.members.some((m: any) => (m._id ? m._id.toString() : m.toString()) === userId.toString());
    if (!isMember) {
        throw new AppError("User is not a member of the project", 400);
    }
    project.members = project.members.filter(member => (member._id ? member._id.toString() : member.toString()) !== userId);
    await project.save();
    await project.populate("owner", "firstName lastName email avatar role");
    await project.populate("members", "firstName lastName email avatar role");
    return project;
}



