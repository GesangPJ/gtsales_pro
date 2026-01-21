/*
  Warnings:

  - Added the required column `biayakirim` to the `pembelian` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pembelian" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kode" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "metode" TEXT NOT NULL,
    "jumlahtotal" INTEGER NOT NULL,
    "biayakirim" INTEGER NOT NULL,
    "distributorId" INTEGER,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "pembelian_distributorId_fkey" FOREIGN KEY ("distributorId") REFERENCES "distributor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "pembelian_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_pembelian" ("createdAt", "distributorId", "id", "jumlahtotal", "kode", "metode", "status", "updatedAt", "userId") SELECT "createdAt", "distributorId", "id", "jumlahtotal", "kode", "metode", "status", "updatedAt", "userId" FROM "pembelian";
DROP TABLE "pembelian";
ALTER TABLE "new_pembelian" RENAME TO "pembelian";
CREATE UNIQUE INDEX "pembelian_kode_key" ON "pembelian"("kode");
CREATE INDEX "pembelian_kode_idx" ON "pembelian"("kode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
