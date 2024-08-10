/**
 * Handlers for authententicating customer
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import bcrypt from "bcrypt";
import { LoginRequest, RegisterCustomerRequest } from "../../types";
import generateToken, { generateRefreshToken } from "../../utils/token";

// Function to authenticate customer
export const register = async (
  req: RegisterCustomerRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, firstName, lastName, password } = req.body;

    // Check if user already exists
    const alreadyExists = await prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (alreadyExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const customer = await prisma.$transaction(
      async (txl) => {
        const newCustomer = await txl.customer.create({
          data: {
            email,
            firstName,
            lastName,
            password: hashedPassword,
          },
        });

        await txl.cart.create({
          data: {
            customerID: newCustomer.id,
          },
        });

        await txl.wishList.create({
          data: {
            customerID: customer.id,
          },
        });

        return newCustomer;
      },
      {
        maxWait: 5000,
        timeout: 10000,
      }
    );

    return res.status(201).json({
      message: "Customer registered successfully",
      customer,
    });
  } catch (e) {
    return next(e as Error);
  }
};

// Function to login customer
export const login = async (
  req: LoginRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const customer = await prisma.customer.findUnique({
      where: {
        email,
      },
      include: {
        cart: {
          include: {
            cartItems: true,
          },
        },
      },
    });

    if (!customer) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (!customer.active) {
      return res.status(401).json({
        message: "Account is not active",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, customer.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(customer.id, customer.email, "customer");
    const refreshToken = generateRefreshToken(
      customer.id,
      customer.email,
      "customer"
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      refreshToken,
    });
  } catch (e) {
    return next(e as Error);
  }
};
