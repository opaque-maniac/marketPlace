import { PrismaClient } from "@prisma/client";
import app from "../../../src/server";
import request from "supertest";
import bcrypt from "bcrypt";
import createJWT from "../../../src/utils/createToken";

const prisma = new PrismaClient();

const userData = {
  email: "test@example.com",
  firstName: "Test",
  lastName: "User",
  password: "testpasswordNow",
};

afterAll(async () => {
  await prisma.customer.deleteMany({});
  await prisma.$disconnect();
}, 10000);

describe("Test the register endpoint", () => {
  test("Test successfull register with 201 status code", async () => {
    let url = "/api-client/register";

    const response = await request(app)
      .post(url)
      .send(userData)
      .set({ accept: "application/json" });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toMatch("Customer created");
    expect(response.body.customer.email).toMatch(userData.email);
  });
});
