import { PrismaClient } from "@prisma/client";
import app from "../../../src/server";
import request from "supertest";
import bcrypt from "bcrypt";
import createJWT from "../../../src/utils/createToken";

const prisma = new PrismaClient();

const userData = {
  email: "user@example.com",
  firstName: "Test",
  lastName: "User",
  password: "TestUserPAssword",
};

beforeAll(async () => {
  await prisma.$connect();
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  await prisma.customer.create({
    data: {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: hashedPassword,
    },
  });
});

afterAll(async () => {
  await prisma.customer.deleteMany({});
  await prisma.$disconnect();
});

describe("Testing the login endpoint", () => {
  let url = "/api-client/login";

  test("The endpoint should login successfully", async () => {
    const response = await request(app)
      .post(url)
      .send({ email: userData.email, password: userData.password })
      .set({ accept: "application/json" });

    expect(response.statusCode).toBe(200);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body.message).toMatch("Login successful");
    expect(response.body.token).toBeDefined();
    expect(response.body.customer.email).toMatch(userData.email);
    expect(response.body.customer.password).not.toMatch(userData.password);
  });

  test("The endpoint if invalid email is provided", async () => {
    const response = await request(app)
      .post(url)
      .send({ email: "m123456@example.com", password: userData.password })
      .set({ accept: "application/json" });

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toMatch("Customer not found");
  });

  /*test("The endpoint if invalid password is provided", async () => {
    const response = await request(app)
      .post(url)
      .send({ email: userData.email, password: "m123456@example.com" })
      .set({ accept: "application/json" });

    console.log(response.statusCode);
  });*/
});
