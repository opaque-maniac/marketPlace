import { PrismaClient } from "@prisma/client";
import { randomInt } from "crypto";
import db from "../db/db";

const MIN = 10_000_00;
const MAX = 100_000_000;
const MAX_ATTEMPTS = 5;

function generateReferenceCode(): string {
  return randomInt(MIN, MAX).toString();
}

export async function generateSellerReferenceNumber(): Promise<string> {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const code = generateReferenceCode();
    const orgExists = await db.sellerOrganization.findFirst({
      where: { referenceNumber: code },
    });
    if (!orgExists) {
      return code;
    }
  }

  throw new Error("Could not generate a unique organization reference code");
}
