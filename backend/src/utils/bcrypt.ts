import bcrypt from "bcrypt"

export async function hashPassword(rawString: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(rawString, salt)
}

export async function comparePassword(rawString: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(rawString, hash)
}

