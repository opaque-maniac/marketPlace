import { PrismaClient } from "@prisma/client";
import app from "../../../src/server";
import request from "supertest";

const prisma = new PrismaClient();

let productId;

beforeAll(async () => {
  await prisma.$connect();

  // Create a seller
  const seller = await prisma.seller.create({
    data: {
      firstName: "John",
      lastName: "Doe",
      storeName: "John's Store",
      email: "john.doe@example.com",
      password: "securepassword",
      address: "123 Main St",
      city: "Anytown",
      country: "Countryland",
      phone: "123-456-7890",
    },
  });

  // Create a product for the seller
  const product = await prisma.product.create({
    data: {
      name: "Sample Product",
      description: "This is a sample product.",
      price: 19.99,
      stock: 100,
      category: "ELECTRONICS",
      sellerId: seller.id,
    },
  });

  productId = product.id;
});

afterAll(async () => {
  await prisma.product.deleteMany({});
  await prisma.seller.deleteMany({});
  await prisma.$disconnect();
});

const url = "/api-client/products";

describe("Testing successful fetching of products", () => {
  let testUrl = `${url}?page=1`;

  test("Responds with 200 status code", async () => {
    const response = await request(app)
      .get(testUrl)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    const body = response.body;
    expect(body.message).toBe("Fetched products");
    expect(body.hasNextPage).toBe(false);
    expect(Array.isArray(body.products)).toBe(true);

    // Check if the test product is included
    const productInResponse = body.products.find(
      (product) => product.id === productId
    );
    expect(productInResponse).toBeDefined();
    expect(productInResponse.name).toBe("Sample Product");
  });
});

describe("Test individual product endpoint", () => {
  test("Check response code is 200", async () => {
    let testUrl = `${url}/${productId}`;
    const response = await request(app)
      .get(testUrl)
      .set({ accept: "application/json" });
    expect(response.statusCode).toBe(200);
    expect(response.header["content-type"]).toMatch(/json/);
    const body = response.body;
    expect(body.message).toMatch("Fetched product");
    expect(body.product.id).toMatch(productId);
  });

  test("Not found if invalid id is passed", async () => {
    let testUrl = `${url}/123456789`;
    const response = await request(app)
      .get(testUrl)
      .set({ accept: "application/json" });
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toMatch("Product not found");
  });
});

describe("Testing the search product endpoint", () => {
  let testUrl = `${url}/search`;

  test("Test to see if response will be 200", async () => {
    const response = await request(app)
      .post(testUrl)
      .send({ query: "Sample Product" })
      .set({ accept: "application/json" });

    expect(response.statusCode).toBe(200);
    const body = response.body;
    expect(body.message).toMatch("Fetched products");
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products.length).toBeGreaterThan(0);
    const returnedProduct = body.products.find(
      (product) => product.id === productId
    );
    expect(returnedProduct).toBeDefined();
    expect(returnedProduct.name).toMatch("Sample Product");
  });
});
