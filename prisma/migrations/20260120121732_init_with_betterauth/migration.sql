-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "alamat" TEXT,
    "notelp" TEXT,
    "tipe" TEXT NOT NULL DEFAULT 'user',
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_user" ("alamat", "createdAt", "email", "emailVerified", "id", "image", "name", "notelp", "tipe", "updatedAt") SELECT "alamat", "createdAt", "email", "emailVerified", "id", "image", "name", "notelp", "tipe", "updatedAt" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE INDEX "user_name_idx" ON "user"("name");
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
