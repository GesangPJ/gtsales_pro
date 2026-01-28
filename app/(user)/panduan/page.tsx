
// Halaman panduan aplikasi


export default function HalamanPanduan(){

    return(
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6 my-7">
                <h1 className="font-bold text-center text-3xl">Panduan GTSALES <span className="text-yellow-600">PRO</span></h1>
            </div>
            <div className="px-4 lg:px-6">
                <h2 className="text-lg font-bold">A. Pembelian Produk</h2>
                <p className="mt-2 mb-2">Pembelian produk dilakukan oleh admin atau owner, pembelian produk memerlukan data produk dan id akun yang membuat pembelian,
                    data opsional adalah distributor, distributor tidak harus digunakan dalam pembelian / pengadaan produk. Berikut dibawah ini
                    adalah tahapan pembelian /pengadaan produk :
                </p>
                <ol className="list-decimal mx-8 px-1">
                    <li>Ketik nama produk pada <i>input</i> nama produk, kemudian pilih produk yang sesuai dari pilihan yang tampil dibawahnya.</li>
                    <li>Produk yang dipilih akan tampil di tabel pembelian, anda bisa mengatur jumlah produk dengan klik kolom jumlah kemudian ketik jumlah
                        produk yang akan dibeli.
                    </li>
                    <li>Untuk menghapus produk yang sudah masuk ke tabel pembelian, gunakan <i>icon</i> <b>X</b> di kolom paling kanan.</li>
                    <li>Kemudian pilih metode pembayaran di pilihan metode pembayaran, metode yang ada adalah <i>CASH, TRANSFER, E-WALLET, QRIS</i>.</li>
                    <li>Jika ada biaya pengiriman maka masukkan kedalam <i>input</i> <b>Biaya Kirim</b>.</li>
                    <li>Jika pembelian barang melalui distributor yang sudah didaftarkan di aplikasi, maka klik <b>Pilih Distributor</b> dan pilih distributor yang tampil.</li>
                    <li>Harap memeriksa kembali semua pilihan dan produk yang akan dibeli di sistem pembelian ini.</li>
                    <li>Setelah semua benar, maka klik tombol <b>Pesan Produk</b>.</li>
                    <li>Jika anda ingin memulai ulang tanpa menghapus secara manual, anda bisa menggunakan tombol <i>Reset</i> untuk memulai ulang
                        mengisi form pembelian.
                    </li>
                </ol>

                <h2 className="font-bold text-lg mt-7 mb-2">B. Penjualan Produk (Kasir)</h2>
                <p>Sistem kasir atau penjualan pada aplikasi ini membutuhkan data produk yang sudah ada, serta id akun yang login, berikut dibawah ini tahapan
                    untuk menggunakan fitur kasir / penjualan :
                </p>

                <ol className="list-decimal mx-8 my-3">
                    <li>Jika anda mempunyai barcode scanner atau produk memiliki barcode, ketik barcode di <i>input</i> barcode yang ada, untuk barcode scanner,
                        setelah anda <i>scan</i> barcode produk maka nilai barcode otomatis masuk ke <i>input</i> barcode yang ada.
                    </li>
                    <li>Anda juga bisa mencari produk dengan ketik nama produk pada <i>input</i> Nama Produk yang ada, ketika anda mengetik maka akan tampil dibawahnya
                        beberapa produk yang sesuai dengan nilai ketikan anda, kemudian pilih produknya.
                    </li>
                    <li>Produk yang telah dipilih kemudian masuk ke tabel penjualan, anda bisa mengatur berapa jumlah produk yang diminta oleh pelanggan di kolom <b>jumlah</b></li>
                    <li>Anda bisa memilih metode pembayaran yang dipilih oleh pelanggan, secara <i>default</i> metode pembayaran adalah <b>CASH</b>, metode pembayaran yang ada di pilihan adalah 
                        CASH, QRIS, TRANSFER, E-WALLET.
                    </li>
                    <li>Jika ada promo diskon, anda bisa memasukkan nilai diskon dalam format uang bukan persen di <i>input</i> diskon, jumlah maksimum diskon adalah 50% dari total harga.</li>
                    <li>Jika ada pesan atau informasi tambahan, anda bisa memasukkan di <i>input</i> keterangan.</li>
                    <li>Harap memastikan semua produk yang dipilih adalah produk yang ingin dibeli oleh pelanggan, dan pastikan jumlahnya sesuai, untuk menghapus produk yang telah dipilih
                        dari tabel, anda bisa menggunakan <i>icon</i> atau tanda <b>X</b> di kolom paling kanan di baris yang sama.
                    </li>
                    <li>Setelah semua sudah dicek, dan pelanggan sudah membayar, kemudian klik tombol <b>Bayar</b>.</li>
                    <li>Jika anda ingin memulai ulang, anda bisa menggunakan tombol <i>Reset</i> untuk mengatur ulang semua <i>input</i> di form kasir.</li>
                
                </ol>

                <h2 className="text-lg font-bold mt-7 mb-2">C. Kategori Produk</h2>
                <p>Pilih menu Kategori Produk di <i>sidebar</i>, maka akan muncul halaman kategori produk dengan tabel yang berisi nama kategori produk, untuk
                    menambahkan kategori produk, gunakan <i>input</i> yang ada di Tambah Kategori Produk, ketik nama kategori kemudian klik tombol <b>Simpan Kategori</b>.
                </p>

                <h2 className="text-lg font-bold mt-7 mb-2">D. Data Produk</h2>
                <p>Pilih menu Daftar Produk untuk melihat daftar produk yang ada, daftar produk ada di tabel daftar produk, anda bisa sortir produk dengan klik kolom yang ada, untuk menambahkan
                    produk, hanya bisa dilakukan oleh akun admin dan owner, untuk menambahkan produk pilih menu <b>Tambah Produk</b> kemudian di halaman ini ada banyak <i>input</i>, berikut keterangan dan tahapan
                    penambahan produk :
                </p>
                <ol className="list-decimal mx-8 my-3">
                    <li><b>Nama Produk</b>: Ketik nama produk pada input ini, pastikan nama produk tidak sama dengan yang sudah ada.</li>
                    <li><b>Jenis Produk</b>: Pilih jenis produk apakah jenis <b>BARANG</b> atau <b>PANGAN</b>.</li>
                    <li><b>Kategori</b>: Pilih kategori yang sesuai dengan produk yang akan ditambahkan.</li>
                    <li><b>Harga Jual</b>: Masukkan harga jual produk dalam format rupiah.</li>
                    <li><b>Harga Beli</b>: Masukkan harga beli.</li>
                    <li><b>Stok Awal</b>: Masukkan jumlah stok produk.</li>
                    <li><b>Keterangan</b>: Jika ada informasi tambahan mengenai produk, ketik dibawah keterangan.</li>
                    <li>Pastikan semua <i>input</i> sudah benar dan sesuai, untuk memulai ulang anda bisa menggunakan tombol <b>Reset</b>.</li>
                    <li>Jika semua sudah benar dan sesuai, klik tombol <b>Simpan</b> untuk menyimpan data produk.</li>
                </ol>

                <h2 className="text-lg font-bold mt-7 mb-2">E. Distributor</h2>
            </div>
        </div>
    )
}


