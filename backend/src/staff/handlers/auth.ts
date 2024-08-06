/**
 * Handlers for authententicating staff
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */

import { Response, NextFunction } from "express";
import prisma from "../../utils/db";
import bcrypt from "bcrypt";
import { LoginRequest, RegisterCustomerRequest } from "../../types";
import generateToken from "../../utils/token";
