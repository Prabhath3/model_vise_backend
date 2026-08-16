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

export const requireRole = (role : string) => {
    return (req:Request, res:Response, next:NextFunction) => {
        if(!req.session.userId){
            res.status(401).json({
                success:false,
                message:"Authendication required"
            })
            return
        }

        if(req.session.role != role){
            res.status(403).json({
                success:true,
                message:"Access denied"
            })
            return
        }
        next()
    }
}