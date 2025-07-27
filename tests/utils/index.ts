import { DataSource } from "typeorm";
import { AppDataSource } from "../../src/config/data-source";
import bcrypt from "bcryptjs";
import { User } from "../../src/entity/User";

export const truncateTables = async (connection: DataSource) => {
  const entities = connection.entityMetadatas;
  for (const entity of entities) {
    const repository = connection.getRepository(entity.name);
    await repository.clear();
    console.log(`Cleared table: ${entity.tableName}`);
  }
};

export const isJwt = (token: string | null): boolean => {
  if (token == null) {
    return false;
  }
  const parts = token.split(".");
  if (parts.length != 3) {
    return false;
  }

  try {
    parts.forEach((part) => {
      Buffer.from(part, "base64").toString("utf-8");
    });
    return true;
  } catch (err) {
    return false;
    console.log((err as Error).message);
  }
};
export async function createUser(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) {
  const userRepository = AppDataSource.getRepository(User);

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return userRepository.save({
    ...data,
    password: hashedPassword,
    role: "customer",
  });
}
