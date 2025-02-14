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
import { serverError } from "../../utils/globals";
import { sendVerificationEmail } from "../../utils/send_email/verify-email";

// Function to authenticate customer
export const register = async (
  req: RegisterCustomerRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, firstName, lastName, password } = req.body;

    // Check if user already exists
    const alreadyExists = await prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (alreadyExists) {
      throw new Error("User already exists");
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
            verified: false,
          },
        });

        await txl.cart.create({
          data: {
            customerID: newCustomer.id,
          },
        });

        await txl.wishList.create({
          data: {
            customerID: newCustomer.id,
          },
        });

        return newCustomer;
      },
      {
        maxWait: 5000,
        timeout: 10000,
      },
    );

    await sendVerificationEmail(
      customer,
      "customer",
      `${firstName} ${lastName}`,
    );

    res.status(201).json({
      message: "Customer registered successfully",
      customer,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// Function to login customer
export const login = async (
  req: LoginRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const customer = await prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (!customer) {
      throw new Error("Invalid email or password");
    }

    if (!customer.active) {
      throw new Error("User is not active");
    }

    if (!customer.verified) {
      throw new Error("User email not verified");
    }

    const isPasswordValid = await bcrypt.compare(password, customer.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken(customer.id, customer.email, "customer");
    const refreshToken = generateRefreshToken(
      customer.id,
      customer.email,
      "customer",
    );

    res.status(200).json({
      message: "Login successful",
      token,
      refreshToken,
      customer,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};
