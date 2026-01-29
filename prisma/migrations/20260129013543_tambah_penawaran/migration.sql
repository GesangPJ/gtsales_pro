-- CreateTable
CREATE TABLE "PenawaranPenjualan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "kode" TEXT NOT NULL,
    "nama_pelanggan" TEXT,
    "alamat_pelanggan" TEXT,
    "email_pelanggan" TEXT,
    "keterangan" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DIBUKA',
    "metode" TEXT NOT NULL DEFAULT 'TRANSFER',
    "jumlahtotal" INTEGER NOT NULL,
    "diskon" INTEGER,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PenawaranPenjualan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DetailPenawaranPenjualan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idpenawaran_s" TEXT NOT NULL,
    "produkId" INTEGER NOT NULL,
    "harga" INTEGER NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DetailPenawaranPenjualan_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "produk" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DetailPenawaranPenjualan_idpenawaran_s_fkey" FOREIGN KEY ("idpenawaran_s") REFERENCES "PenawaranPenjualan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
