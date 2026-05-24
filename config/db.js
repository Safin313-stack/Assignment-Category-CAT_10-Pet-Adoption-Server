import { MongoClient, ServerApiVersion } from "mongodb";

let db;

export const connectDB = async () => {
  const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    db = client.db("pet-adoption");
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
};

export const getDB = () => {
  if (!db) throw new Error("DB not initialized");
  return db;
};
