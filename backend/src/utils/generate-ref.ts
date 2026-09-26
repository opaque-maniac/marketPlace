import { PrismaClient } from "@prisma/client";
import { randomInt } from "crypto";

const MIN = 10_000_00;
const MAX = 100_000_000;

function generateReferenceCode(): string {
  return randomInt(MIN, MAX).toString();
}

export async function generateSellerReferenceNumber(
  db: PrismaClient,
): Promise<string> {
  while (true) {
    const code = generateReferenceCode();
    const codeExists = await db.sellerOrganization.findFirst({
      where: {
        referenceNumber: code,
      },
    });
    if (codeExists) {
      continue;
    }

    return code;
  }
}
