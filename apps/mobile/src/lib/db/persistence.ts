import {
  createExpoSQLitePersistence,
  type ExpoSQLiteDatabaseLike,
  type PersistedCollectionPersistence,
} from "@tanstack/expo-db-sqlite-persistence";
import * as SQLite from "expo-sqlite";

let persistenceInstance: PersistedCollectionPersistence | null = null;

export function getDbPersistence(): PersistedCollectionPersistence {
  if (!persistenceInstance) {
    const database = SQLite.openDatabaseSync("cinefam.db") as ExpoSQLiteDatabaseLike;
    persistenceInstance = createExpoSQLitePersistence({ database });
  }
  return persistenceInstance;
}
