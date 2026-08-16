import {Request, Response, NextFunction} from "express";
import { success } from "zod";

export const requireAuth = (
    req : Request,
    res : Response,
    next : NextFunction
) => {
    if (!req.session.userId) {
        res.status(401).json({
            success:false,
            message:"Authendication required"
        })
        return
    }

    next()
    
}