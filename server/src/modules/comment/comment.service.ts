import Comment from "./comment.model";
import Task from "../task/task.model";
import User from "../users/user.model";
import Project from "../project/project.model";
import AppError from "../../core/errors/AppError";
import APIFeatures from "../../core/utils/apiFeatures"
import { IComment } from "./comment.types";

export const createcommentService = async (taskId: string, userId: string, comment: IComment) => {
    const task = await Task.findById(taskId);
    if (!task) {
        throw new AppError("Task not found", 404);
    }
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError("User not found", 404);
    }
    
    const createComment = await Comment.create({ ...comment, task: taskId, author: userId });
    return createComment;
}

export const getTaskCommentsService = async (taskId: string) => {
    const task = await Task.findById(taskId);
    if (!task) {
        throw new AppError("Task not found", 404);
    }
    const comments = await Comment.find({ task: taskId }).populate("author", "firstName lastName email").populate("task", "title description");
    return comments;
}

export const updateCommentsService = async (commentId: string, comment: IComment) => {
    const updateComment = await Comment.findByIdAndUpdate(commentId, comment, { new: true });
    if (!updateComment) {
        throw new AppError("Comment not found", 404);
    }
    return updateComment;
}

export const deleteCommentService = async (commentId: string) => {
    const deleteComment = await Comment.findByIdAndDelete(commentId);
    if (!deleteComment) {
        throw new AppError("Comment not found", 404);
    }
    return deleteComment;
}