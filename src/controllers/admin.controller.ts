import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

export const getAdminDashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.session.userId;

    const admin = await prisma.user.findUnique({
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
    });

    if (!admin) {
      res.status(404).json({
        success: false,
        message: "Admin not found"
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Welcome to the admin dashboard",
      admin
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};