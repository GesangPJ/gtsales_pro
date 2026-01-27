-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_penjualan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kode" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "metode" TEXT NOT NULL,
    "diskon" INTEGER DEFAULT 0,
    "jumlahtotal" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "penjualan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_penjualan" ("createdAt", "diskon", "id", "jumlahtotal", "kode", "metode", "status", "updatedAt", "userId") SELECT "createdAt", "diskon", "id", "jumlahtotal", "kode", "metode", "status", "updatedAt", "userId" FROM "penjualan";
DROP TABLE "penjualan";
ALTER TABLE "new_penjualan" RENAME TO "penjualan";
CREATE UNIQUE INDEX "penjualan_kode_key" ON "penjualan"("kode");
CREATE INDEX "penjualan_kode_idx" ON "penjualan"("kode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
