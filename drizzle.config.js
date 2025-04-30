import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_GcnS56qhtbUE@ep-round-sky-a4gtm3tx-pooler.us-east-1.aws.neon.tech/ai-interview-mocker?sslmode=require",
  },
});
