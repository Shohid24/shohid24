import MongoConnection from "./server/db";

export async function register() {
  await MongoConnection();
}

export default register;
