-- CreateTable
CREATE TABLE "gaji" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kode_gaji" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nama_user" TEXT NOT NULL,
    "gaji_nett" INTEGER NOT NULL,
    "tanggal" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" DATETIME NOT NULL,
    CONSTRAINT "gaji_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "gajidetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gajiId" INTEGER NOT NULL,
    "gaji_pokok" INTEGER NOT NULL DEFAULT 0,
    "tidak_masuk" INTEGER DEFAULT 0,
    "bonus" INTEGER DEFAULT 0,
    "kategori_ptkp" TEXT NOT NULL DEFAULT 'tk0',
    "isbpjs" BOOLEAN NOT NULL,
    "bpjs_nilai" INTEGER NOT NULL DEFAULT 0,
    "ispph" BOOLEAN NOT NULL,
    "pph_nilai" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "gajidetail_gajiId_fkey" FOREIGN KEY ("gajiId") REFERENCES "gaji" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "gaji_kode_gaji_key" ON "gaji"("kode_gaji");

-- CreateIndex
CREATE INDEX "gaji_nama_user_idx" ON "gaji"("nama_user");

-- CreateIndex
CREATE INDEX "gaji_kode_gaji_idx" ON "gaji"("kode_gaji");

-- CreateIndex
CREATE INDEX "gajidetail_gajiId_idx" ON "gajidetail"("gajiId");
