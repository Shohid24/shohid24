import MongoConnection from "./server/db";
import fs from "fs";
import User from "./server/schema/user";

const fetchData = async () => {
  const users = await User.find({}).lean();
  const searchableData = users.map((user) => ({
    id: user.id.toString(),
    name: {
      bn: user.bn.name,
      en: user.en.name,
    },
    profession: {
      bn: user.bn.profession,
      en: user.en.profession,
    },
    info: {
      bn: user.bn.info,
      en: user.en.info,
    },
    date: user.date,
    hasImage: user.hasImage,
  }));

  const filePath =
    process.cwd().replaceAll("\\", "/") + "/public/data/searchableData.json";

  fs.writeFileSync(filePath, JSON.stringify(searchableData, null, 2));

  console.log("✅ searchableData.json has been fetched!");
};

fetchData().catch((err) => {
  console.error("❌ Error fetching data:", err);
  process.exit(1);
});

export async function register() {
  await MongoConnection();
  await fetchData();
}

export default register;
