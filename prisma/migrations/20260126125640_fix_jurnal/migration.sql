/*
  Warnings:

  - You are about to drop the column `kterangan` on the `jurnal` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_jurnal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kode" TEXT NOT NULL,
    "akun" TEXT NOT NULL,
    "debit" DECIMAL NOT NULL,
    "kredit" DECIMAL NOT NULL,
    "keterangan" TEXT,
    "sumber" TEXT,
    "sumberId" INTEGER,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "jurnal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_jurnal" ("akun", "createdAt", "debit", "id", "kode", "kredit", "sumber", "sumberId", "updatedAt", "userId") SELECT "akun", "createdAt", "debit", "id", "kode", "kredit", "sumber", "sumberId", "updatedAt", "userId" FROM "jurnal";
DROP TABLE "jurnal";
ALTER TABLE "new_jurnal" RENAME TO "jurnal";
CREATE INDEX "jurnal_kode_idx" ON "jurnal"("kode");
CREATE INDEX "jurnal_userId_idx" ON "jurnal"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
