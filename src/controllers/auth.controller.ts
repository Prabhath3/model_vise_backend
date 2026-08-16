import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service.js";
import {prisma} from "../config/prisma.js"
import { success } from "zod";

// Test Express → Controller → Service

// Real registration endpoint
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const user = await registerUser(name, email, password);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user
    });
  } catch (error) {
    console.error(error);

    if (
      error instanceof Error &&
      error.message === "EMAIL_ALREADY_EXISTS"
    ) {
      res.status(409).json({
        success: false,
        message: "Email already exists"
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser(email, password);

    req.session.userId = user.id;
    req.session.role = user.role;

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    console.error(error);

    if (
      error instanceof Error &&
      error.message === "INVALID_CREDENTIALS"
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Not authenticated"
      });
      return;
    }

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
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};

export const logout = ( req: Request, res : Response) => {
  req.session.destroy((error) => {
    if(error){
      console.log(error)

      res.status(500).json({
        success:false,
        message : "Logout failed"
      })
      return
    }

    res.clearCookie("connect.sid")

    res.status(200).json({
      success:true,
      message : "Logout successful"
    })
  })
}