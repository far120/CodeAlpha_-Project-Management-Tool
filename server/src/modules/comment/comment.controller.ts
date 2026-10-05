import express from "express";
import asyncHandler from "express-async-handler";
import { createcommentService, getTaskCommentsService, updateCommentsService, deleteCommentService } from "./comment.service";

export const createComment = asyncHandler(async (req: express.Request, res: express.Response) => {
    const comment = await createcommentService(req.params.taskId as string,req.user.id, req.body);
    res.status(201).json({
        status: "success",
        data: comment,
    });
});

export const getTaskComments = asyncHandler(async (req: express.Request, res: express.Response) => {
    const comments = await getTaskCommentsService(req.params.taskId as string);
    res.status(200).json({
        status: "success",
        data: comments,
    });
});

export const updateComments = asyncHandler(async (req: express.Request, res: express.Response) => {
    const comment = await updateCommentsService(req.params.commentId as string, req.body);
    res.status(200).json({
        status: "success",
        data: comment,
    });
});




export const deleteComment = asyncHandler(async (req: express.Request, res: express.Response) => {
    const comment = await deleteCommentService(req.params.commentId as string);
    res.status(200).json({
        status: "success",
        data: comment,
    });
});
