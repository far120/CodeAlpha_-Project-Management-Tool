import Task from "./task.model";
import User from "../users/user.model";
import Comment from "../comment/comment.model";
import Project from "../project/project.model";
import AppError from "../../core/errors/AppError";
import APIFeatures from "../../core/utils/apiFeatures"
import { ITask } from "./task.types";

export const createTaskService = async (projectId: string, userId: string, task: ITask) => {
    const project = await Project.findById(projectId);
    if (!project) {
        throw new AppError("Project not found", 404);
    }
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError("User not found", 404);
    }
    const isMember =
        project.members.some((m: any) => (m._id ? m._id.toString() : m.toString()) === userId.toString()) ||
        (project.owner && project.owner.toString() === userId.toString());

    if (!isMember) {
        throw new AppError("User is not a member of this project", 400);
    }

    const created = await Task.create({ ...task, project: projectId, createdBy: userId });
    await created.populate("assignedTo", "firstName lastName email");
    await created.populate("createdBy", "firstName lastName email");
    await created.populate("project", "name");
    return created;
}

export const getTasksService = async (projectId: string) => {
    const project = await Project.findById(projectId);
    if (!project) {
        throw new AppError("Project not found", 404);
    }
    //use APIFeatures to filter, sort, and paginate the tasks
    const query = Task.find({ project: projectId })
    .populate("assignedTo", "firstName lastName email")
    .populate("createdBy", "firstName lastName email")
    .populate("project", "name");
    const apiFeatures = new APIFeatures(query, {})
        .filter()
        .sort()
        .search(["title", "description"]);
        
    await apiFeatures.paginate();
    const tasks = await apiFeatures.query;
    return tasks;
}

export const getTaskByIdService = async (taskId: string) => {
const task = await Task.findById(taskId)
  .populate("assignedTo", "firstName lastName email")
  .populate("createdBy", "firstName lastName email")
  .populate("project", "name");
    if (!task) {
        throw new AppError("Task not found", 404);
    }
    return task;
}

export const updateTaskService = async (taskId: string, task: ITask) => {
    const atask = await Task.findById(taskId);
    if (!atask) {
        throw new AppError("Task not found", 404);
    }
    const updateTask = await Task.findByIdAndUpdate(taskId, task, { new: true })
      .populate("assignedTo", "firstName lastName email")
      .populate("createdBy", "firstName lastName email")
      .populate("project", "name");
    if (!updateTask) {
        throw new AppError("Task not found", 404);
    }
    return updateTask;
}


export const deleteTaskService = async (taskId: string) => {
    const deletecomments = await Comment.deleteMany({
        task: taskId,
    });
    const deleteTask = await Task.findByIdAndDelete(taskId);
    if (!deleteTask) {
        throw new AppError("Task not found", 404);
    }
    return deleteTask;
}

