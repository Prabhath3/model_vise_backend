import { Request, Response } from "express"
import { prisma } from "../config/prisma.js"
import { success } from "zod"

export const getUserDashboard = async (
    req: Request,
    res: Response
) => {
    try {
        const userId = req.session.userId
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },

            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                isEmailVerified: true,
                createdAt: true
            }
        })

        if (!user) {
            res.status(404).json({
                success: false,
                message: "user not found"
            })
            return
        }

        res.status(200).json({
            success: true,
            message: "Welcome to the user dashboard",
            user
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            Message: "something went wrong"
        })
    }
}