import * as schema from "@/lib/drizzle/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export function getConnectionString(env: CloudflareBindings): string {
  if (env.HYPERDRIVE?.connectionString) {
    return env.HYPERDRIVE.connectionString;
  }
  if (env.DATABASE_URL) {
    return env.DATABASE_URL;
  }
  throw new Error("DATABASE_URL or HYPERDRIVE binding is required");
}

export function createDb(env: CloudflareBindings) {
  const connectionString = getConnectionString(env);
  const client = postgres(connectionString, { prepare: false, max: 5 });
  return drizzle(client, { schema });
}

export type AppDatabase = ReturnType<typeof createDb>;
