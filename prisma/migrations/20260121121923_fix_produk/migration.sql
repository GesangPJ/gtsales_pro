/*
  Warnings:

  - You are about to drop the column `distributorId` on the `produk` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_produk" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "barcode" TEXT NOT NULL,
    "harga_jual" INTEGER NOT NULL,
    "harga_beli" INTEGER NOT NULL,
    "stok" INTEGER NOT NULL,
    "jenis" TEXT NOT NULL DEFAULT 'BARANG',
    "keterangan" TEXT,
    "kategoriId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "produk_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "kategori" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_produk" ("barcode", "createdAt", "harga_beli", "harga_jual", "id", "jenis", "kategoriId", "keterangan", "nama", "stok", "updatedAt") SELECT "barcode", "createdAt", "harga_beli", "harga_jual", "id", "jenis", "kategoriId", "keterangan", "nama", "stok", "updatedAt" FROM "produk";
DROP TABLE "produk";
ALTER TABLE "new_produk" RENAME TO "produk";
CREATE UNIQUE INDEX "produk_barcode_key" ON "produk"("barcode");
CREATE INDEX "produk_nama_idx" ON "produk"("nama");
CREATE INDEX "produk_barcode_idx" ON "produk"("barcode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
