# **KONFIRMASI ORDER - BO ADMIN SETTING PROMO SUBSCRIPTION**

| **No. KO**    | : KO-SPS-001                                   | **Tanggal** | : 15 September 2025 |
| ------------- | ---------------------------------------------- | ----------- | ------------------- | --- | --- |
| **Penugasan** | : Setting Promo Subscription - BO Admin System |             |                     |
| ---           | ---                                            |             |                     | --- | --- |

## **Penjelasan Umum**

Dokumen ini berisi konfirmasi order untuk pengembangan fitur Setting Promo Subscription pada sistem Back Office (BO) Admin. Sistem ini memungkinkan admin untuk mengelola promo subscription dengan berbagai jenis (Promo Paket dan Promo Trial) termasuk workflow approval, filtering, pencarian, dan manajemen status promo.

## **Main Rules**

- Semua interaksi menggunakan visual feedback berupa highlight, hover effects, dan loading states
- Sistem role-based access: User dengan dan tanpa hak akses approval memiliki menu yang berbeda
- Format tanggal konsisten: DD/MM/YYYY HH:MM di seluruh sistem
- Validasi real-time untuk semua input form dengan error handling yang informatif
- Status promo update otomatis berdasarkan waktu sistem (Akan Datang → Berjalan → Selesai)
- Pagination dengan opsi tampilan data: 10, 25, 50, 100 per halaman
- Search functionality dengan debounce 300ms untuk performance
- Sistem approval workflow dengan tracking riwayat perubahan
- Multi-select dropdown dengan opsi "Semua" yang menghapus pilihan individual
- Penambahan menu dan hak akses pada master hak akses di BO setting umum
- Jika ada user yang memiliki lebih dari 1 role (cross account) dan terdapat lebih dari 1 promo pada periode yang sama untuk semua role yang dimiliki user tersebut maka prioritas promo yang ditampilkan adalah promo dengan nilai terbesar atau promo terbaru jika nilai promo sama
- Hak akses diantaranya :
  - View
  - Tambah
  - Ubah (untuk akses ubah data dan aktif/nonaktifkan data)
  - Approval

## **Setting Promo Subscription - Sidebar Menu LW-SPS-1**

| **Kategori**                                                                           | **Rules**                                                                               | **HW Frontend (jam)** | **HW Backend (jam)** |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                                                               | 1\. Sidebar menu dengan highlight pada menu aktif "Setting Promo Subscription"          |                       |                      |
| ---                                                                                    | ---                                                                                     | ---                   | ---                  |
| 2\. Header dengan logo muatparts dan navigasi Home/Logout                              |                                                                                         |                       |
| ---                                                                                    | ---                                                                                     | ---                   | ---                  |
| 3\. Area konten utama menampilkan halaman Setting Promo Subscription                   |                                                                                         |                       |
| ---                                                                                    | ---                                                                                     | ---                   | ---                  |
| 4\. Background biru navy pada sidebar                                                  |                                                                                         |                       |
| ---                                                                                    | ---                                                                                     | ---                   | ---                  |
| 5\. Ikon menu dan teks berwarna putih                                                  |                                                                                         |                       |
| ---                                                                                    | ---                                                                                     | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**                                                  | 1\. Menu "Setting Promo Subscription" di sidebar (dapat diklik)                         |                       |                      |
| ---                                                                                    | ---                                                                                     | ---                   | ---                  |
| 2\. Button "Home" di header                                                            |                                                                                         |                       |
| ---                                                                                    | ---                                                                                     | ---                   | ---                  |
| 3\. Button "Logout" di header                                                          |                                                                                         |                       |
| ---                                                                                    | ---                                                                                     | ---                   | ---                  |
| **UX Rules**                                                                           | 1\. Menu aktif akan ter-highlight dengan warna background berbeda dari menu tidak aktif |                       |                      |
| ---                                                                                    | ---                                                                                     | ---                   | ---                  |
| 2\. Menu "Setting Promo Subscription" untuk membuka halaman Setting Promo Subscription |                                                                                         |                       |
| ---                                                                                    | ---                                                                                     | ---                   | ---                  |
| 3\. Menu aktif pada sidebar akan ter-highlight dan memiliki warna background berbeda   |                                                                                         |                       |
| ---                                                                                    | ---                                                                                     | ---                   | ---                  |
| **Interaksi & Navigasi**                                                               | 1\. Klik menu "Setting Promo Subscription" membuka halaman utama                        |                       |                      |
| ---                                                                                    | ---                                                                                     | ---                   | ---                  |
| 2\. Menu aktif memiliki visual feedback berupa highlight warna                         |                                                                                         |                       |
| ---                                                                                    | ---                                                                                     | ---                   | ---                  |
| **Default Value & Data Source**                                                        | TIDAK ADA                                                                               |                       |                      |
| ---                                                                                    | ---                                                                                     | ---                   | ---                  |
| **Validasi Field**                                                                     | TIDAK ADA                                                                               |                       |                      |
| ---                                                                                    | ---                                                                                     | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**                                                   | Klik menu → Halaman Setting Promo Subscription                                          |                       |                      |
| ---                                                                                    | ---                                                                                     | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                                                            | 1\. Terhubung dengan sistem BO Admin Setting Transaksi muatparts                        |                       |                      |
| ---                                                                                    | ---                                                                                     | ---                   | ---                  |
| 2\. Kemungkinan terkait dengan modul transaksi subscription                            |                                                                                         |                       |
| ---                                                                                    | ---                                                                                     | ---                   | ---                  |
| **Case Preventif**                                                                     | TIDAK ADA DATA                                                                          |                       |                      |
| ---                                                                                    | ---                                                                                     | ---                   | ---                  |

## **Setting Promo Subscription - First Timer - Data Kosong LW-SPS-2**

| **Kategori**                                                                                  | **Rules**                                                                   | **HW Frontend (jam)** | **HW Backend (jam)** |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                                                                      | 1\. Header dengan judul "Setting Promo Subscription" dan button back        |                       |                      |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 2\. 3 Tab menu: Transaksi/Pengajuan(3)/Riwayat                                                |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 3\. Sub-tab: Aktif dan Riwayat                                                                |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 4\. Button "Tambah" dan "Filter"                                                              |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 5\. Field pencarian                                                                           |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 6\. Tabel kosong dengan semua header kolom                                                    |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 7\. Komponen pagination dan counter                                                           |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**                                                         | 1\. Button back (←)                                                         |                       |                      |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 2\. Tab Transaksi, Pengajuan (3), Riwayat                                                     |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 3\. Sub-tab Aktif dan Riwayat                                                                 |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 4\. Button "Tambah"                                                                           |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 5\. Button "Filter"                                                                           |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 6\. Field pencarian "Cari"                                                                    |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 7\. Dropdown "Menampilkan 10 data"                                                            |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 8\. Nomor pagination                                                                          |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| **UX Rules**                                                                                  | 1\. User tanpa akses approval: menu "Transaksi", "Pengajuan (N)", "Riwayat" |                       |                      |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 2\. User dengan akses approval: menu "Transaksi", "Butuh Approval (N)", "Riwayat"             |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 3\. Counter merah "(N)" muncul jika ada data menunggu approval                                |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 4\. Tab "Transaksi" dan sub-tab "Aktif" aktif secara default                                  |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 5\. Sub-tab "Aktif" menampilkan data status "Akan Datang" dan "Berjalan"                      |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 6\. Sub-tab "Riwayat" menampilkan data status "Selesai"                                       |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 7\. Teks "Tidak ada data dalam tabel" saat kosong. Counter menampilkan "Data tidak ditemukan" |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| **Interaksi & Navigasi**                                                                      | 1\. Button back → halaman utama BO Admin Setting Transaksi                  |                       |                      |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 2\. Tab switching untuk filter data berdasarkan status                                        |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 3\. Button "Tambah" → form Tambah Promo Subscription. Filter dapat di-expand/collapse         |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| **Default Value & Data Source**                                                               | 1\. Default tab: Transaksi > Aktif                                          |                       |                      |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 2\. Default tampilan: 10 data per halaman                                                     |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 3\. Data source dari database promo subscription                                              |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| **Validasi Field**                                                                            | TIDAK ADA                                                                   |                       |                      |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**                                                          | 1\. Button back → Halaman utama BO Admin                                    |                       |                      |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 2\. Button Tambah → Form Tambah Promo Subscription                                            |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                                                                   | 1\. Menu berbeda berdasarkan hak akses approval                             |                       |                      |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 2\. Terkait dengan modul pembayaran subscription                                              |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| **Case Preventif**                                                                            | 1\. User tanpa approval: menu "Pengajuan"                                   |                       |                      |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 2\. User dengan approval: menu "Butuh Approval"                                               |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |
| 3\. Handling partial approval access                                                          |                                                                             |                       |
| ---                                                                                           | ---                                                                         | ---                   | ---                  |

## **Setting Promo Subscription - First Timer - Ada Data Tersimpan LW-SPS-3**

| **Kategori**                                                                          | **Rules**                                                     | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                                                              | 1\. Layout sama dengan **LW-SPS-2**                           |                       |                      |
| ---                                                                                   | ---                                                           | ---                   | ---                  |
| 2\. Tabel terisi dengan 4 baris data                                                  |                                                               |                       |
| ---                                                                                   | ---                                                           | ---                   | ---                  |
| 3\. Badge status dengan warna (Detail hijau, Ubah kuning)                             |                                                               |                       |
| ---                                                                                   | ---                                                           | ---                   | ---                  |
| 4\. Counter menampilkan "Menampilkan 1-4 dari total 4 data pada kolom 1 dari 1 kolom" |                                                               |                       |
| ---                                                                                   | ---                                                           | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**                                                 | 1\. Button "Detail" (hijau) per baris                         |                       |                      |
| ---                                                                                   | ---                                                           | ---                   | ---                  |
| 2\. Button "Ubah" (kuning) per baris                                                  |                                                               |                       |
| ---                                                                                   | ---                                                           | ---                   | ---                  |
| 3\. Semua elemen dari **LW-SPS-2**                                                    |                                                               |                       |
| ---                                                                                   | ---                                                           | ---                   | ---                  |
| **UX Rules**                                                                          | 1\. Data diurutkan berdasarkan data terbaru di atas (default) |                       |                      |
| ---                                                                                   | ---                                                           | ---                   | ---                  |
| 2\. Status "Berjalan" jika sudah masuk waktu mulai berlaku (promo aktif)              |                                                               |                       |
| ---                                                                                   | ---                                                           | ---                   | ---                  |
| 3\. Status "Akan Datang" jika belum masuk waktu mulai berlaku                         |                                                               |                       |
| ---                                                                                   | ---                                                           | ---                   | ---                  |
| 4\. Status "Selesai" jika sudah berakhir                                              |                                                               |                       |
| ---                                                                                   | ---                                                           | ---                   | ---                  |
| 5\. Format tanggal: DD/MM/YYYY HH:MM                                                  |                                                               |                       |
| ---                                                                                   | ---                                                           | ---                   | ---                  |
| 6\. Paket lebih dari satu dihubungkan dengan tanda ","                                |                                                               |                       |
| ---                                                                                   | ---                                                           | ---                   | ---                  |
| 7\. Tipe pengguna lebih dari satu dihubungkan dengan tanda ","                        |                                                               |                       |
| ---                                                                                   | ---                                                           | ---                   | ---                  |
| **Interaksi & Navigasi**                                                              | 1\. Button Detail → halaman detail promo                      |                       |                      |
| ---                                                                                   | ---                                                           | ---                   | ---                  |
| 2\. Button Ubah → form ubah promo                                                     |                                                               |                       |
| ---                                                                                   | ---                                                           | ---                   | ---                  |
| 3\. Header kolom dapat diklik untuk sorting                                           |                                                               |                       |
| ---                                                                                   | ---                                                           | ---                   | ---                  |
| **Default Value & Data Source**                                                       | 1\. Sorting default: data terbaru                             |                       |                      |
| ---                                                                                   | ---                                                           | ---                   | ---                  |
| 2\. Status otomatis berdasarkan waktu sistem                                          |                                                               |                       |
| ---                                                                                   | ---                                                           | ---                   | ---                  |
| 3\. Real-time status update                                                           |                                                               |                       |
| ---                                                                                   | ---                                                           | ---                   | ---                  |
| **Validasi Field**                                                                    | TIDAK ADA                                                     |                       |                      |
| ---                                                                                   | ---                                                           | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**                                                  | 1\. Detail → Halaman Detail Promo                             |                       |                      |
| ---                                                                                   | ---                                                           | ---                   | ---                  |
| 2\. Ubah → Form Ubah Promo                                                            |                                                               |                       |
| ---                                                                                   | ---                                                           | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                                                           | 1\. Status promo terkait dengan waktu sistem                  |                       |                      |
| ---                                                                                   | ---                                                           | ---                   | ---                  |
| 2\. Kuota terpakai update dari transaksi                                              |                                                               |                       |
| ---                                                                                   | ---                                                           | ---                   | ---                  |
| **Case Preventif**                                                                    | 1\. Status berubah otomatis saat waktu tercapai               |                       |                      |
| ---                                                                                   | ---                                                           | ---                   | ---                  |
| 2\. Handling timezone differences                                                     |                                                               |                       |
| ---                                                                                   | ---                                                           | ---                   | ---                  |

## **Setting Promo Subscription - First Timer - Ada Data Tersimpan - Hover List LW-SPS-4**

| **Kategori**                                    | **Rules**                                                       | **HW Frontend (jam)** | **HW Backend (jam)** |
| ----------------------------------------------- | --------------------------------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                        | 1\. Sama dengan **LW-SPS-3**                                    |                       |                      |
| ---                                             | ---                                                             | ---                   | ---                  |
| 2\. Background baris berubah abu-abu saat hover |                                                                 |                       |
| ---                                             | ---                                                             | ---                   | ---                  |
| 3\. Cursor berubah menjadi pointer              |                                                                 |                       |
| ---                                             | ---                                                             | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**           | 1\. Semua elemen dari **LW-SPS-3**                              |                       |                      |
| ---                                             | ---                                                             | ---                   | ---                  |
| 2\. Baris tabel menjadi interaktif saat hover   |                                                                 |                       |
| ---                                             | ---                                                             | ---                   | ---                  |
| **UX Rules**                                    | 1\. Background baris yang di-hover akan berubah menjadi abu-abu |                       |                      |
| ---                                             | ---                                                             | ---                   | ---                  |
| 2\. Transisi smooth pada hover                  |                                                                 |                       |
| ---                                             | ---                                                             | ---                   | ---                  |
| 3\. Hover effect sebagai visual feedback        |                                                                 |                       |
| ---                                             | ---                                                             | ---                   | ---                  |
| **Interaksi & Navigasi**                        | 1\. Hover baris menampilkan visual feedback                     |                       |                      |
| ---                                             | ---                                                             | ---                   | ---                  |
| 2\. Klik baris tidak ada aksi (hanya button)    |                                                                 |                       |
| ---                                             | ---                                                             | ---                   | ---                  |
| **Default Value & Data Source**                 | Sama dengan **LW-SPS-3**                                        |                       |                      |
| ---                                             | ---                                                             | ---                   | ---                  |
| **Validasi Field**                              | TIDAK ADA                                                       |                       |                      |
| ---                                             | ---                                                             | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**            | Sama dengan **LW-SPS-3**                                        |                       |                      |
| ---                                             | ---                                                             | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                     | Sama dengan **LW-SPS-3**                                        |                       |                      |
| ---                                             | ---                                                             | ---                   | ---                  |
| **Case Preventif**                              | TIDAK ADA DATA                                                  |                       |                      |
| ---                                             | ---                                                             | ---                   | ---                  |

## **Setting Promo Subscription - First Timer - Ada Data Tersimpan - Opsi Tampilkan Data LW-SPS-5**

| **Kategori**                                           | **Rules**                                       | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------------------------ | ----------------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                               | 1\. Dropdown "Menampilkan data" terbuka         |                       |                      |
| ---                                                    | ---                                             | ---                   | ---                  |
| 2\. Opsi: 10, 25, 50, 100                              |                                                 |                       |
| ---                                                    | ---                                             | ---                   | ---                  |
| 3\. Dropdown overlay di atas tabel                     |                                                 |                       |
| ---                                                    | ---                                             | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**                  | 1\. Dropdown tampilkan data (expanded)          |                       |                      |
| ---                                                    | ---                                             | ---                   | ---                  |
| 2\. Opsi 10 (terpilih)                                 |                                                 |                       |
| ---                                                    | ---                                             | ---                   | ---                  |
| 3\. Opsi 25, 50, 100 (dapat diklik)                    |                                                 |                       |
| ---                                                    | ---                                             | ---                   | ---                  |
| 4\. Klik di luar dropdown untuk menutup                |                                                 |                       |
| ---                                                    | ---                                             | ---                   | ---                  |
| **UX Rules**                                           | 1\. Opsi terpilih ter-highlight                 |                       |                      |
| ---                                                    | ---                                             | ---                   | ---                  |
| 2\. Dropdown auto-close setelah pilih                  |                                                 |                       |
| ---                                                    | ---                                             | ---                   | ---                  |
| 3\. Jumlah maksimal data per halaman akan menyesuaikan |                                                 |                       |
| ---                                                    | ---                                             | ---                   | ---                  |
| 4\. Komponen counter dan pagination menyesuaikan       |                                                 |                       |
| ---                                                    | ---                                             | ---                   | ---                  |
| 5\. Visual feedback pada hover opsi                    |                                                 |                       |
| ---                                                    | ---                                             | ---                   | ---                  |
| **Interaksi & Navigasi**                               | 1\. Pilih opsi → update jumlah data per halaman |                       |                      |
| ---                                                    | ---                                             | ---                   | ---                  |
| 2\. Klik di luar → tutup dropdown                      |                                                 |                       |
| ---                                                    | ---                                             | ---                   | ---                  |
| **Default Value & Data Source**                        | 1\. Default: 10 data per halaman                |                       |                      |
| ---                                                    | ---                                             | ---                   | ---                  |
| 2\. Opsi tersedia: 10, 25, 50, 100                     |                                                 |                       |
| ---                                                    | ---                                             | ---                   | ---                  |
| **Validasi Field**                                     | TIDAK ADA                                       |                       |                      |
| ---                                                    | ---                                             | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**                   | Tetap di halaman sama dengan data ter-update    |                       |                      |
| ---                                                    | ---                                             | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                            | 1\. Mempengaruhi pagination                     |                       |                      |
| ---                                                    | ---                                             | ---                   | ---                  |
| 2\. Update tampilan counter                            |                                                 |                       |
| ---                                                    | ---                                             | ---                   | ---                  |
| **Case Preventif**                                     | TIDAK ADA DATA                                  |                       |                      |
| ---                                                    | ---                                             | ---                   | ---                  |

## **Setting Promo Subscription - Tab Riwayat LW-SPS-6**

| **Kategori**                                                                     | **Rules**                                                      | **HW Frontend (jam)** | **HW Backend (jam)** |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                                                         | 1\. Tab "Riwayat" aktif (biru)                                 |                       |                      |
| ---                                                                              | ---                                                            | ---                   | ---                  |
| 2\. Tab "Aktif" tidak aktif (putih)                                              |                                                                |                       |
| ---                                                                              | ---                                                            | ---                   | ---                  |
| 3\. Tabel menampilkan data status "Selesai"                                      |                                                                |                       |
| ---                                                                              | ---                                                            | ---                   | ---                  |
| 4\. Kolom Action hanya button "Detail" (tanpa "Ubah")                            |                                                                |                       |
| ---                                                                              | ---                                                            | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**                                            | 1\. Tab Riwayat (aktif)                                        |                       |                      |
| ---                                                                              | ---                                                            | ---                   | ---                  |
| 2\. Button "Detail" saja per baris                                               |                                                                |                       |
| ---                                                                              | ---                                                            | ---                   | ---                  |
| 3\. Tidak ada button "Ubah"                                                      |                                                                |                       |
| ---                                                                              | ---                                                            | ---                   | ---                  |
| **UX Rules**                                                                     | 1\. Tab Riwayat hanya menampilkan data dengan status "Selesai" |                       |                      |
| ---                                                                              | ---                                                            | ---                   | ---                  |
| 2\. Data dengan status "Selesai" adalah data yang masa berlakunya sudah berakhir |                                                                |                       |
| ---                                                                              | ---                                                            | ---                   | ---                  |
| 3\. Hanya button "Detail" tanpa "Ubah" karena data sudah berakhir                |                                                                |                       |
| ---                                                                              | ---                                                            | ---                   | ---                  |
| 4\. Data expired masuk otomatis ke riwayat                                       |                                                                |                       |
| ---                                                                              | ---                                                            | ---                   | ---                  |
| 5\. Visual state untuk tab aktif dan tidak aktif                                 |                                                                |                       |
| ---                                                                              | ---                                                            | ---                   | ---                  |
| **Interaksi & Navigasi**                                                         | 1\. Tab switching Aktif ↔ Riwayat                             |                       |                      |
| ---                                                                              | ---                                                            | ---                   | ---                  |
| 2\. Detail → halaman detail (read-only)                                          |                                                                |                       |
| ---                                                                              | ---                                                            | ---                   | ---                  |
| **Default Value & Data Source**                                                  | 1\. Filter status: "Selesai" saja                              |                       |                      |
| ---                                                                              | ---                                                            | ---                   | ---                  |
| 2\. Data dari promo yang sudah berakhir                                          |                                                                |                       |
| ---                                                                              | ---                                                            | ---                   | ---                  |
| **Validasi Field**                                                               | TIDAK ADA                                                      |                       |                      |
| ---                                                                              | ---                                                            | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**                                             | Detail → Halaman Detail Promo (read-only)                      |                       |                      |
| ---                                                                              | ---                                                            | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                                                      | Data otomatis pindah dari Aktif ke Riwayat                     |                       |                      |
| ---                                                                              | ---                                                            | ---                   | ---                  |
| **Case Preventif**                                                               | Tidak bisa edit data riwayat                                   |                       |                      |
| ---                                                                              | ---                                                            | ---                   | ---                  |

## **Setting Promo Subscription - Sorting - Ascending LW-SPS-7**

| **Kategori**                                                   | **Rules**                                   | **HW Frontend (jam)** | **HW Backend (jam)** |
| -------------------------------------------------------------- | ------------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                                       | 1\. Ikon sorting (↑) pada header kolom      |                       |                      |
| ---                                                            | ---                                         | ---                   | ---                  |
| 2\. Data terurut ascending                                     |                                             |                       |
| ---                                                            | ---                                         | ---                   | ---                  |
| 3\. Indikator visual pada kolom ter-sort                       |                                             |                       |
| ---                                                            | ---                                         | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**                          | 1\. Header kolom dapat diklik untuk sorting |                       |                      |
| ---                                                            | ---                                         | ---                   | ---                  |
| 2\. Ikon sorting berubah sesuai state                          |                                             |                       |
| ---                                                            | ---                                         | ---                   | ---                  |
| **UX Rules**                                                   | 1\. Klik 1x: sorting ascending              |                       |                      |
| ---                                                            | ---                                         | ---                   | ---                  |
| 2\. Klik 2x: sorting descending                                |                                             |                       |
| ---                                                            | ---                                         | ---                   | ---                  |
| 3\. Klik 3x: kembali ke sorting default (data terbaru di atas) |                                             |                       |
| ---                                                            | ---                                         | ---                   | ---                  |
| 4\. Siklus berulang setelah klik ke-3                          |                                             |                       |
| ---                                                            | ---                                         | ---                   | ---                  |
| 5\. Semua kolom kecuali "Action" memiliki komponen sorting     |                                             |                       |
| ---                                                            | ---                                         | ---                   | ---                  |
| 6\. Visual feedback pada hover header kolom                    |                                             |                       |
| ---                                                            | ---                                         | ---                   | ---                  |
| **Interaksi & Navigasi**                                       | 1\. Klik header → trigger sorting           |                       |                      |
| ---                                                            | ---                                         | ---                   | ---                  |
| 2\. Multiple kolom bisa di-sort bergantian                     |                                             |                       |
| ---                                                            | ---                                         | ---                   | ---                  |
| **Default Value & Data Source**                                | 1\. Default: sort berdasarkan data terbaru  |                       |                      |
| ---                                                            | ---                                         | ---                   | ---                  |
| 2\. Sorting client-side atau server-side                       |                                             |                       |
| ---                                                            | ---                                         | ---                   | ---                  |
| **Validasi Field**                                             | TIDAK ADA                                   |                       |                      |
| ---                                                            | ---                                         | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**                           | Tetap di halaman sama dengan data ter-sort  |                       |                      |
| ---                                                            | ---                                         | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                                    | Sorting kombinasi dengan filter dan search  |                       |                      |
| ---                                                            | ---                                         | ---                   | ---                  |
| **Case Preventif**                                             | Kolom "Action" tidak bisa di-sort           |                       |                      |
| ---                                                            | ---                                         | ---                   | ---                  |

## **Setting Promo Subscription - Sorting - Descending LW-SPS-8**

| **Kategori**                                  | **Rules**                                 | **HW Frontend (jam)** | **HW Backend (jam)** |
| --------------------------------------------- | ----------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                      | 1\. Ikon sorting (↓) pada header kolom    |                       |                      |
| ---                                           | ---                                       | ---                   | ---                  |
| 2\. Data terurut descending                   |                                           |                       |
| ---                                           | ---                                       | ---                   | ---                  |
| 3\. Indikator visual kolom ter-sort           |                                           |                       |
| ---                                           | ---                                       | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**         | 1\. Header kolom dengan ikon descending   |                       |                      |
| ---                                           | ---                                       | ---                   | ---                  |
| 2\. State sorting siklus ke-2                 |                                           |                       |
| ---                                           | ---                                       | ---                   | ---                  |
| **UX Rules**                                  | 1\. State ke-2 dari 3-state sorting cycle |                       |                      |
| ---                                           | ---                                       | ---                   | ---                  |
| 2\. Ikon berubah dari ascending ke descending |                                           |                       |
| ---                                           | ---                                       | ---                   | ---                  |
| 3\. Klik lagi akan kembali ke sorting default |                                           |                       |
| ---                                           | ---                                       | ---                   | ---                  |
| **Interaksi & Navigasi**                      | Klik lagi → kembali ke default sorting    |                       |                      |
| ---                                           | ---                                       | ---                   | ---                  |
| **Default Value & Data Source**               | Sama dengan **LW-SPS-7**                  |                       |                      |
| ---                                           | ---                                       | ---                   | ---                  |
| **Validasi Field**                            | TIDAK ADA                                 |                       |                      |
| ---                                           | ---                                       | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**          | Sama dengan **LW-SPS-7**                  |                       |                      |
| ---                                           | ---                                       | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                   | Sama dengan **LW-SPS-7**                  |                       |                      |
| ---                                           | ---                                       | ---                   | ---                  |
| **Case Preventif**                            | Sama dengan **LW-SPS-7**                  |                       |                      |
| ---                                           | ---                                       | ---                   | ---                  |

## **Setting Promo Subscription - Pencarian - Data Ditemukan LW-SPS-9**

| **Kategori**                                                               | **Rules**                                                        | **HW Frontend (jam)** | **HW Backend (jam)** |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                                                   | 1\. Field pencarian terisi "Regular"                             |                       |                      |
| ---                                                                        | ---                                                              | ---                   | ---                  |
| 2\. Button X untuk hapus pencarian                                         |                                                                  |                       |
| ---                                                                        | ---                                                              | ---                   | ---                  |
| 3\. Tabel menampilkan hasil filter                                         |                                                                  |                       |
| ---                                                                        | ---                                                              | ---                   | ---                  |
| 4\. Counter: "Menampilkan 1-1 dari total 1 data pada kolom 1 dari 1 kolom" |                                                                  |                       |
| ---                                                                        | ---                                                              | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**                                      | 1\. Field pencarian dengan value                                 |                       |                      |
| ---                                                                        | ---                                                              | ---                   | ---                  |
| 2\. Button X (hapus pencarian)                                             |                                                                  |                       |
| ---                                                                        | ---                                                              | ---                   | ---                  |
| 3\. Hasil pencarian di tabel                                               |                                                                  |                       |
| ---                                                                        | ---                                                              | ---                   | ---                  |
| **UX Rules**                                                               | 1\. Pencarian dilakukan secara realtime setelah input 1 karakter |                       |                      |
| ---                                                                        | ---                                                              | ---                   | ---                  |
| 2\. Button X untuk reset field pencarian dan hasil pencarian               |                                                                  |                       |
| ---                                                                        | ---                                                              | ---                   | ---                  |
| 3\. Pencarian berdasarkan semua kolom                                      |                                                                  |                       |
| ---                                                                        | ---                                                              | ---                   | ---                  |
| 4\. Case insensitive search                                                |                                                                  |                       |
| ---                                                                        | ---                                                              | ---                   | ---                  |
| 5\. Debounce 300ms untuk performance                                       |                                                                  |                       |
| ---                                                                        | ---                                                              | ---                   | ---                  |
| 6\. Highlight hasil pencarian dalam teks (optional)                        |                                                                  |                       |
| ---                                                                        | ---                                                              | ---                   | ---                  |
| **Interaksi & Navigasi**                                                   | 1\. Ketik → real-time filter                                     |                       |                      |
| ---                                                                        | ---                                                              | ---                   | ---                  |
| 2\. Klik X → reset pencarian                                               |                                                                  |                       |
| ---                                                                        | ---                                                              | ---                   | ---                  |
| **Default Value & Data Source**                                            | 1\. Search query: input user                                     |                       |                      |
| ---                                                                        | ---                                                              | ---                   | ---                  |
| 2\. Search scope: semua kolom                                              |                                                                  |                       |
| ---                                                                        | ---                                                              | ---                   | ---                  |
| **Validasi Field**                                                         | TIDAK ADA                                                        |                       |                      |
| ---                                                                        | ---                                                              | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**                                       | Tetap di halaman dengan hasil search                             |                       |                      |
| ---                                                                        | ---                                                              | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                                                | 1\. Search kombinasi dengan filter                               |                       |                      |
| ---                                                                        | ---                                                              | ---                   | ---                  |
| 2\. Pagination update sesuai hasil                                         |                                                                  |                       |
| ---                                                                        | ---                                                              | ---                   | ---                  |
| **Case Preventif**                                                         | 1\. Handling karakter khusus                                     |                       |                      |
| ---                                                                        | ---                                                              | ---                   | ---                  |
| 2\. Pencegahan SQL injection                                               |                                                                  |                       |
| ---                                                                        | ---                                                              | ---                   | ---                  |

## **Setting Promo Subscription - Pencarian - Data Tidak Ditemukan LW-SPS-10**

| **Kategori**                                              | **Rules**                                                                   | **HW Frontend (jam)** | **HW Backend (jam)** |
| --------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                                  | 1\. Field pencarian terisi "Besi"                                           |                       |                      |
| ---                                                       | ---                                                                         | ---                   | ---                  |
| 2\. Tabel kosong dengan teks "Tidak ada data dalam tabel" |                                                                             |                       |
| ---                                                       | ---                                                                         | ---                   | ---                  |
| 3\. Counter: "Data tidak ditemukan"                       |                                                                             |                       |
| ---                                                       | ---                                                                         | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**                     | 1\. Field pencarian dengan value                                            |                       |                      |
| ---                                                       | ---                                                                         | ---                   | ---                  |
| 2\. Button X (hapus pencarian)                            |                                                                             |                       |
| ---                                                       | ---                                                                         | ---                   | ---                  |
| **UX Rules**                                              | 1\. Menampilkan teks "Tidak ada data dalam tabel" saat data tidak ditemukan |                       |                      |
| ---                                                       | ---                                                                         | ---                   | ---                  |
| 2\. Counter menampilkan "Data tidak ditemukan"            |                                                                             |                       |
| ---                                                       | ---                                                                         | ---                   | ---                  |
| 3\. Pagination hanya menampilkan angka 1                  |                                                                             |                       |
| ---                                                       | ---                                                                         | ---                   | ---                  |
| **Interaksi & Navigasi**                                  | Klik X → reset dan tampilkan semua data                                     |                       |                      |
| ---                                                       | ---                                                                         | ---                   | ---                  |
| **Default Value & Data Source**                           | Sama dengan **LW-SPS-9**                                                    |                       |                      |
| ---                                                       | ---                                                                         | ---                   | ---                  |
| **Validasi Field**                                        | TIDAK ADA                                                                   |                       |                      |
| ---                                                       | ---                                                                         | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**                      | Hapus pencarian → tampilkan semua data                                      |                       |                      |
| ---                                                       | ---                                                                         | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                               | Sama dengan **LW-SPS-9**                                                    |                       |                      |
| ---                                                       | ---                                                                         | ---                   | ---                  |
| **Case Preventif**                                        | Saran pencarian alternatif atau koreksi typo                                |                       |                      |
| ---                                                       | ---                                                                         | ---                   | ---                  |

## **Setting Promo Subscription - Filter LW-SPS-11**

| **Kategori**                                                  | **Rules**                                                        | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------------------------------- | ---------------------------------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                                      | 1\. Form filter expanded di bawah button Filter                  |                       |                      |
| ---                                                           | ---                                                              | ---                   | ---                  |
| 2\. Button "Sembunyikan" untuk collapse                       |                                                                  |                       |
| ---                                                           | ---                                                              | ---                   | ---                  |
| 3\. Multiple filter fields dalam grid layout                  |                                                                  |                       |
| ---                                                           | ---                                                              | ---                   | ---                  |
| 4\. Button Reset dan Terapkan                                 |                                                                  |                       |
| ---                                                           | ---                                                              | ---                   | ---                  |
| 5\. Form filter dengan border dan background terpisah         |                                                                  |                       |
| ---                                                           | ---                                                              | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**                         | 1\. Button "Sembunyikan"                                         |                       |                      |
| ---                                                           | ---                                                              | ---                   | ---                  |
| 2\. Field ID (textfield)                                      |                                                                  |                       |
| ---                                                           | ---                                                              | ---                   | ---                  |
| 3\. Checkbox Status: Akan Datang, Berjalan                    |                                                                  |                       |
| ---                                                           | ---                                                              | ---                   | ---                  |
| 4\. Checkbox Tipe Promo: Promo Paket, Promo Trial             |                                                                  |                       |
| ---                                                           | ---                                                              | ---                   | ---                  |
| 5\. Masa Berlaku (2 datetimepicker)                           |                                                                  |                       |
| ---                                                           | ---                                                              | ---                   | ---                  |
| 6\. Dropdown Paket Subscription                               |                                                                  |                       |
| ---                                                           | ---                                                              | ---                   | ---                  |
| 7\. Dropdown Pengguna                                         |                                                                  |                       |
| ---                                                           | ---                                                              | ---                   | ---                  |
| 8\. Field Kuota (2 field numeric)                             |                                                                  |                       |
| ---                                                           | ---                                                              | ---                   | ---                  |
| 9\. Field Kuota Terpakai (2 field numeric)                    |                                                                  |                       |
| ---                                                           | ---                                                              | ---                   | ---                  |
| 10\. Button Reset                                             |                                                                  |                       |
| ---                                                           | ---                                                              | ---                   | ---                  |
| 11\. Button Terapkan                                          |                                                                  |                       |
| ---                                                           | ---                                                              | ---                   | ---                  |
| 12\. Toggle filter show/hide                                  |                                                                  |                       |
| ---                                                           | ---                                                              | ---                   | ---                  |
| **UX Rules**                                                  | 1\. Button "Filter" untuk menampilkan/menyembunyikan form filter |                       |                      |
| ---                                                           | ---                                                              | ---                   | ---                  |
| 2\. Button "Sembunyikan" untuk menyembunyikan form filter     |                                                                  |                       |
| ---                                                           | ---                                                              | ---                   | ---                  |
| 3\. Field kosong dianggap tidak ada batasan                   |                                                                  |                       |
| ---                                                           | ---                                                              | ---                   | ---                  |
| 4\. Button "Reset" untuk mereset form filter dan hasil filter |                                                                  |                       |
| ---                                                           | ---                                                              | ---                   | ---                  |
| 5\. Button "Terapkan" untuk menerapkan filter                 |                                                                  |                       |
| ---                                                           | ---                                                              | ---                   | ---                  |
| 6\. Visual feedback untuk filter aktif                        |                                                                  |                       |
| ---                                                           | ---                                                              | ---                   | ---                  |
| **Interaksi & Navigasi**                                      | 1\. Sembunyikan → collapse filter                                |                       |                      |
| ---                                                           | ---                                                              | ---                   | ---                  |
| 2\. Reset → hapus semua filter                                |                                                                  |                       |
| ---                                                           | ---                                                              | ---                   | ---                  |
| 3\. Terapkan → apply filter                                   |                                                                  |                       |
| ---                                                           | ---                                                              | ---                   | ---                  |
| **Default Value & Data Source**                               | 1\. Semua filter kosong secara default                           |                       |                      |
| ---                                                           | ---                                                              | ---                   | ---                  |
| 2\. Master data untuk dropdown                                |                                                                  |                       |
| ---                                                           | ---                                                              | ---                   | ---                  |
| **Validasi Field**                                            | 1\. Masa Berlaku: start ≤ end                                    |                       |                      |
| ---                                                           | ---                                                              | ---                   | ---                  |
| 2\. Kuota: min ≤ max                                          |                                                                  |                       |
| ---                                                           | ---                                                              | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**                          | Tetap di halaman dengan data terfilter                           |                       |                      |
| ---                                                           | ---                                                              | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                                   | Filter + Search + Sort kombinasi                                 |                       |                      |
| ---                                                           | ---                                                              | ---                   | ---                  |
| **Case Preventif**                                            | TIDAK ADA DATA                                                   |                       |                      |
| ---                                                           | ---                                                              | ---                   | ---                  |

## **Setting Promo Subscription - Filter - Status Terpilih LW-SPS-12**

| **Kategori**                             | **Rules**                                | **HW Frontend (jam)** | **HW Backend (jam)** |
| ---------------------------------------- | ---------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                 | 1\. Checkbox "Akan Datang" checked (✓)   |                       |                      |
| ---                                      | ---                                      | ---                   | ---                  |
| 2\. Visual feedback checkbox aktif       |                                          |                       |
| ---                                      | ---                                      | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**    | 1\. Checkbox Akan Datang (checked)       |                       |                      |
| ---                                      | ---                                      | ---                   | ---                  |
| 2\. Checkbox Berjalan (unchecked)        |                                          |                       |
| ---                                      | ---                                      | ---                   | ---                  |
| **UX Rules**                             | 1\. Checkbox terpilih akan aktif/checked |                       |                      |
| ---                                      | ---                                      | ---                   | ---                  |
| 2\. Multiple checkbox dapat dipilih      |                                          |                       |
| ---                                      | ---                                      | ---                   | ---                  |
| 3\. Visual state untuk checked/unchecked |                                          |                       |
| ---                                      | ---                                      | ---                   | ---                  |
| 4\. Hover effect pada checkbox           |                                          |                       |
| ---                                      | ---                                      | ---                   | ---                  |
| **Interaksi & Navigasi**                 | Toggle checkbox on/off                   |                       |                      |
| ---                                      | ---                                      | ---                   | ---                  |
| **Default Value & Data Source**          | Default: tidak ada yang terpilih         |                       |                      |
| ---                                      | ---                                      | ---                   | ---                  |
| **Validasi Field**                       | TIDAK ADA                                |                       |                      |
| ---                                      | ---                                      | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**     | Terapkan filter → update tabel           |                       |                      |
| ---                                      | ---                                      | ---                   | ---                  |
| **Keterkaitan Antar Fitur**              | Bagian dari composite filter             |                       |                      |
| ---                                      | ---                                      | ---                   | ---                  |
| **Case Preventif**                       | TIDAK ADA DATA                           |                       |                      |
| ---                                      | ---                                      | ---                   | ---                  |

## **Setting Promo Subscription - Filter - Tipe Promo Terpilih LW-SPS-13**

| **Kategori**                          | **Rules**                                | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------- | ---------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**              | 1\. Checkbox "Promo Paket" checked (✓)   |                       |                      |
| ---                                   | ---                                      | ---                   | ---                  |
| 2\. Visual feedback checkbox aktif    |                                          |                       |
| ---                                   | ---                                      | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif** | 1\. Checkbox Promo Paket (checked)       |                       |                      |
| ---                                   | ---                                      | ---                   | ---                  |
| 2\. Checkbox Promo Trial (unchecked)  |                                          |                       |
| ---                                   | ---                                      | ---                   | ---                  |
| **UX Rules**                          | 1\. Checkbox terpilih akan aktif/checked |                       |                      |
| ---                                   | ---                                      | ---                   | ---                  |
| 2\. Multiple selection diperbolehkan  |                                          |                       |
| ---                                   | ---                                      | ---                   | ---                  |
| 3\. Status checkbox independen        |                                          |                       |
| ---                                   | ---                                      | ---                   | ---                  |
| **Interaksi & Navigasi**              | Toggle checkbox secara independen        |                       |                      |
| ---                                   | ---                                      | ---                   | ---                  |
| **Default Value & Data Source**       | Default: tidak ada yang terpilih         |                       |                      |
| ---                                   | ---                                      | ---                   | ---                  |
| **Validasi Field**                    | TIDAK ADA                                |                       |                      |
| ---                                   | ---                                      | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**  | Terapkan filter → update tabel           |                       |                      |
| ---                                   | ---                                      | ---                   | ---                  |
| **Keterkaitan Antar Fitur**           | Bagian dari composite filter             |                       |                      |
| ---                                   | ---                                      | ---                   | ---                  |
| **Case Preventif**                    | TIDAK ADA DATA                           |                       |                      |
| ---                                   | ---                                      | ---                   | ---                  |

## **Setting Promo Subscription - Filter - Klik Masa Berlaku LW-SPS-14**

| **Kategori**                                                                     | **Rules**                                 | **HW Frontend (jam)** | **HW Backend (jam)** |
| -------------------------------------------------------------------------------- | ----------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                                                         | 1\. Popup calendar datetimepicker         |                       |                      |
| ---                                                                              | ---                                       | ---                   | ---                  |
| 2\. Tampilan calendar dengan tanggal terpilih                                    |                                           |                       |
| ---                                                                              | ---                                       | ---                   | ---                  |
| 3\. Selector waktu di bawah calendar                                             |                                           |                       |
| ---                                                                              | ---                                       | ---                   | ---                  |
| 4\. Button Batal dan Terapkan                                                    |                                           |                       |
| ---                                                                              | ---                                       | ---                   | ---                  |
| 5\. Modal overlay dengan background dimmed                                       |                                           |                       |
| ---                                                                              | ---                                       | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**                                            | 1\. Cell tanggal calendar                 |                       |                      |
| ---                                                                              | ---                                       | ---                   | ---                  |
| 2\. Navigasi bulan/tahun                                                         |                                           |                       |
| ---                                                                              | ---                                       | ---                   | ---                  |
| 3\. Field input waktu                                                            |                                           |                       |
| ---                                                                              | ---                                       | ---                   | ---                  |
| 4\. Button Batal                                                                 |                                           |                       |
| ---                                                                              | ---                                       | ---                   | ---                  |
| 5\. Button Terapkan                                                              |                                           |                       |
| ---                                                                              | ---                                       | ---                   | ---                  |
| 6\. Arrow navigation untuk bulan                                                 |                                           |                       |
| ---                                                                              | ---                                       | ---                   | ---                  |
| **UX Rules**                                                                     | 1\. Border field berwarna biru saat aktif |                       |                      |
| ---                                                                              | ---                                       | ---                   | ---                  |
| 2\. Datetimepicker default tanggal dan waktu saat ini                            |                                           |                       |
| ---                                                                              | ---                                       | ---                   | ---                  |
| 3\. Waktu lampau disabled                                                        |                                           |                       |
| ---                                                                              | ---                                       | ---                   | ---                  |
| 4\. Jika field berakhir terisi duluan, field mulai maksimal sama dengan berakhir |                                           |                       |
| ---                                                                              | ---                                       | ---                   | ---                  |
| 5\. Jika field mulai terisi duluan, field berakhir minimal sama dengan mulai     |                                           |                       |
| ---                                                                              | ---                                       | ---                   | ---                  |
| 6\. Pertimbangan timezone                                                        |                                           |                       |
| ---                                                                              | ---                                       | ---                   | ---                  |
| **Interaksi & Navigasi**                                                         | 1\. Pilih tanggal → update field          |                       |                      |
| ---                                                                              | ---                                       | ---                   | ---                  |
| 2\. Batal → tutup picker                                                         |                                           |                       |
| ---                                                                              | ---                                       | ---                   | ---                  |
| 3\. Terapkan → apply datetime                                                    |                                           |                       |
| ---                                                                              | ---                                       | ---                   | ---                  |
| **Default Value & Data Source**                                                  | 1\. Default: datetime saat ini            |                       |                      |
| ---                                                                              | ---                                       | ---                   | ---                  |
| 2\. Tanggal minimal: hari ini                                                    |                                           |                       |
| ---                                                                              | ---                                       | ---                   | ---                  |
| **Validasi Field**                                                               | 1\. Tanggal mulai ≤ Tanggal berakhir      |                       |                      |
| ---                                                                              | ---                                       | ---                   | ---                  |
| 2\. Tidak boleh tanggal lampau                                                   |                                           |                       |
| ---                                                                              | ---                                       | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**                                             | Terapkan → tutup picker, update field     |                       |                      |
| ---                                                                              | ---                                       | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                                                      | Validasi linked start/end date            |                       |                      |
| ---                                                                              | ---                                       | ---                   | ---                  |
| **Case Preventif**                                                               | TIDAK ADA DATA                            |                       |                      |
| ---                                                                              | ---                                       | ---                   | ---                  |

## **Setting Promo Subscription - Filter - Klik Paket Subscription LW-SPS-15**

| **Kategori**                                                 | **Rules**                         | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------------------------------ | --------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                                     | 1\. Dropdown multi-select terbuka |                       |                      |
| ---                                                          | ---                               | ---                   | ---                  |
| 2\. Search box di bagian atas                                |                                   |                       |
| ---                                                          | ---                               | ---                   | ---                  |
| 3\. Opsi "Semua Paket" tanpa checkbox                        |                                   |                       |
| ---                                                          | ---                               | ---                   | ---                  |
| 4\. List paket dengan checkbox                               |                                   |                       |
| ---                                                          | ---                               | ---                   | ---                  |
| 5\. Item terpilih sebagai bubble di field                    |                                   |                       |
| ---                                                          | ---                               | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**                        | 1\. Field search dalam dropdown   |                       |                      |
| ---                                                          | ---                               | ---                   | ---                  |
| 2\. Opsi "Semua Paket"                                       |                                   |                       |
| ---                                                          | ---                               | ---                   | ---                  |
| 3\. Checkbox per paket                                       |                                   |                       |
| ---                                                          | ---                               | ---                   | ---                  |
| 4\. Button X pada bubble terpilih                            |                                   |                       |
| ---                                                          | ---                               | ---                   | ---                  |
| **UX Rules**                                                 | 1\. Border field biru saat aktif  |                       |                      |
| ---                                                          | ---                               | ---                   | ---                  |
| 2\. "Semua Paket" menghapus pilihan lain                     |                                   |                       |
| ---                                                          | ---                               | ---                   | ---                  |
| 3\. Opsi dapat dipilih lebih dari 1                          |                                   |                       |
| ---                                                          | ---                               | ---                   | ---                  |
| 4\. Opsi terpilih ditampilkan sebagai bubble dengan button X |                                   |                       |
| ---                                                          | ---                               | ---                   | ---                  |
| 5\. Jika "Semua Paket" dipilih, opsi lain terhapus           |                                   |                       |
| ---                                                          | ---                               | ---                   | ---                  |
| 6\. Max height dengan scroll                                 |                                   |                       |
| ---                                                          | ---                               | ---                   | ---                  |
| **Interaksi & Navigasi**                                     | 1\. Search → filter opsi          |                       |                      |
| ---                                                          | ---                               | ---                   | ---                  |
| 2\. Select → tambah bubble                                   |                                   |                       |
| ---                                                          | ---                               | ---                   | ---                  |
| 3\. X pada bubble → hapus pilihan                            |                                   |                       |
| ---                                                          | ---                               | ---                   | ---                  |
| **Default Value & Data Source**                              | 1\. List paket dari master data   |                       |                      |
| ---                                                          | ---                               | ---                   | ---                  |
| 2\. Tidak ada default selection                              |                                   |                       |
| ---                                                          | ---                               | ---                   | ---                  |
| **Validasi Field**                                           | TIDAK ADA                         |                       |                      |
| ---                                                          | ---                               | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**                         | Pilihan update tampilan field     |                       |                      |
| ---                                                          | ---                               | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                                  | Master data paket subscription    |                       |                      |
| ---                                                          | ---                               | ---                   | ---                  |
| **Case Preventif**                                           | "Semua Paket" override individual |                       |                      |
| ---                                                          | ---                               | ---                   | ---                  |

## **Setting Promo Subscription - Filter - Klik Pengguna LW-SPS-16**

| **Kategori**                                  | **Rules**                         | **HW Frontend (jam)** | **HW Backend (jam)** |
| --------------------------------------------- | --------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                      | 1\. Dropdown multi-select terbuka |                       |                      |
| ---                                           | ---                               | ---                   | ---                  |
| 2\. Search box dengan placeholder "Cari User" |                                   |                       |
| ---                                           | ---                               | ---                   | ---                  |
| 3\. Opsi "Semua Pengguna"                     |                                   |                       |
| ---                                           | ---                               | ---                   | ---                  |
| 4\. List tipe pengguna dengan checkbox        |                                   |                       |
| ---                                           | ---                               | ---                   | ---                  |
| 5\. Deskripsi panjang per opsi                |                                   |                       |
| ---                                           | ---                               | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**         | 1\. Field search                  |                       |                      |
| ---                                           | ---                               | ---                   | ---                  |
| 2\. Opsi "Semua Pengguna"                     |                                   |                       |
| ---                                           | ---                               | ---                   | ---                  |
| 3\. Checkbox untuk 8 tipe pengguna            |                                   |                       |
| ---                                           | ---                               | ---                   | ---                  |
| 4\. Bubble dengan X untuk terpilih            |                                   |                       |
| ---                                           | ---                               | ---                   | ---                  |
| **UX Rules**                                  | 1\. Border field biru saat aktif  |                       |                      |
| ---                                           | ---                               | ---                   | ---                  |
| 2\. 8 tipe pengguna tersedia                  |                                   |                       |
| ---                                           | ---                               | ---                   | ---                  |
| 3\. "Semua Pengguna" menghapus pilihan lain   |                                   |                       |
| ---                                           | ---                               | ---                   | ---                  |
| 4\. Multi-select dengan bubble display        |                                   |                       |
| ---                                           | ---                               | ---                   | ---                  |
| 5\. Teks deskriptif per opsi                  |                                   |                       |
| ---                                           | ---                               | ---                   | ---                  |
| 6\. Tooltip untuk teks panjang                |                                   |                       |
| ---                                           | ---                               | ---                   | ---                  |
| **Interaksi & Navigasi**                      | Sama dengan **LW-SPS-15**         |                       |                      |
| ---                                           | ---                               | ---                   | ---                  |
| **Default Value & Data Source**               | 1\. 8 tipe pengguna predefined    |                       |                      |
| ---                                           | ---                               | ---                   | ---                  |
| 2\. Tidak ada default selection               |                                   |                       |
| ---                                           | ---                               | ---                   | ---                  |
| **Validasi Field**                            | TIDAK ADA                         |                       |                      |
| ---                                           | ---                               | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**          | Pilihan update field              |                       |                      |
| ---                                           | ---                               | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                   | Definisi tipe pengguna            |                       |                      |
| ---                                           | ---                               | ---                   | ---                  |
| **Case Preventif**                            | Handling deskripsi panjang        |                       |                      |
| ---                                           | ---                               | ---                   | ---                  |

## **Setting Promo Subscription - Filter - Data Ditemukan LW-SPS-17**

| **Kategori**                                     | **Rules**                                           | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------------------ | --------------------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                         | 1\. Form filter dengan pilihan aktif                |                       |                      |
| ---                                              | ---                                                 | ---                   | ---                  |
| 2\. Tabel menampilkan hasil filter               |                                                     |                       |
| ---                                              | ---                                                 | ---                   | ---                  |
| 3\. Counter ter-update untuk data terfilter      |                                                     |                       |
| ---                                              | ---                                                 | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**            | 1\. Indikator filter aktif                          |                       |                      |
| ---                                              | ---                                                 | ---                   | ---                  |
| 2\. Data terfilter di tabel                      |                                                     |                       |
| ---                                              | ---                                                 | ---                   | ---                  |
| **UX Rules**                                     | 1\. Data tabel hanya menampilkan yang sesuai filter |                       |                      |
| ---                                              | ---                                                 | ---                   | ---                  |
| 2\. Komponen counter dan pagination menyesuaikan |                                                     |                       |
| ---                                              | ---                                                 | ---                   | ---                  |
| 3\. Filter aktif ditampilkan jelas               |                                                     |                       |
| ---                                              | ---                                                 | ---                   | ---                  |
| 4\. Tampilkan ringkasan filter                   |                                                     |                       |
| ---                                              | ---                                                 | ---                   | ---                  |
| **Interaksi & Navigasi**                         | 1\. Reset → hapus filter                            |                       |                      |
| ---                                              | ---                                                 | ---                   | ---                  |
| 2\. Modifikasi filter → re-apply                 |                                                     |                       |
| ---                                              | ---                                                 | ---                   | ---                  |
| **Default Value & Data Source**                  | Dataset terfilter                                   |                       |                      |
| ---                                              | ---                                                 | ---                   | ---                  |
| **Validasi Field**                               | Validasi filter sebelum apply                       |                       |                      |
| ---                                              | ---                                                 | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**             | Tetap di halaman dengan data terfilter              |                       |                      |
| ---                                              | ---                                                 | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                      | Semua filter bekerja bersama                        |                       |                      |
| ---                                              | ---                                                 | ---                   | ---                  |
| **Case Preventif**                               | Kombinasi filter kompleks                           |                       |                      |
| ---                                              | ---                                                 | ---                   | ---                  |

## **Setting Promo Subscription - Filter - Data Tidak Ditemukan LW-SPS-18**

| **Kategori**                                      | **Rules**                             | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------------------- | ------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                          | 1\. Form filter dengan pilihan aktif  |                       |                      |
| ---                                               | ---                                   | ---                   | ---                  |
| 2\. Tabel kosong dengan pesan                     |                                       |                       |
| ---                                               | ---                                   | ---                   | ---                  |
| 3\. "Data tidak ditemukan" di counter             |                                       |                       |
| ---                                               | ---                                   | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**             | 1\. Filter aktif ditampilkan          |                       |                      |
| ---                                               | ---                                   | ---                   | ---                  |
| 2\. Button Reset untuk hapus                      |                                       |                       |
| ---                                               | ---                                   | ---                   | ---                  |
| **UX Rules**                                      | 1\. Teks "Tidak ada data dalam tabel" |                       |                      |
| ---                                               | ---                                   | ---                   | ---                  |
| 2\. Counter "Data tidak ditemukan"                |                                       |                       |
| ---                                               | ---                                   | ---                   | ---                  |
| 3\. Pagination hanya angka 1                      |                                       |                       |
| ---                                               | ---                                   | ---                   | ---                  |
| 4\. Tampilkan filter mana yang menyebabkan kosong |                                       |                       |
| ---                                               | ---                                   | ---                   | ---                  |
| **Interaksi & Navigasi**                          | Reset → tampilkan semua data          |                       |                      |
| ---                                               | ---                                   | ---                   | ---                  |
| **Default Value & Data Source**                   | Hasil filter kosong                   |                       |                      |
| ---                                               | ---                                   | ---                   | ---                  |
| **Validasi Field**                                | TIDAK ADA                             |                       |                      |
| ---                                               | ---                                   | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**              | Reset → tampilkan data tanpa filter   |                       |                      |
| ---                                               | ---                                   | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                       | Sistem feedback filter                |                       |                      |
| ---                                               | ---                                   | ---                   | ---                  |
| **Case Preventif**                                | TIDAK ADA DATA                        |                       |                      |
| ---                                               | ---                                   | ---                   | ---                  |

## **Setting Promo Subscription - Filter - Tab Riwayat LW-SPS-19**

| **Kategori**                              | **Rules**                                    | **HW Frontend (jam)** | **HW Backend (jam)** |
| ----------------------------------------- | -------------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                  | 1\. Form filter pada tab Riwayat             |                       |                      |
| ---                                       | ---                                          | ---                   | ---                  |
| 2\. Tidak ada filter Status (dihilangkan) |                                              |                       |
| ---                                       | ---                                          | ---                   | ---                  |
| 3\. Filter lain sama dengan tab Aktif     |                                              |                       |
| ---                                       | ---                                          | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**     | 1\. Semua filter kecuali Status              |                       |                      |
| ---                                       | ---                                          | ---                   | ---                  |
| 2\. Tab Riwayat aktif                     |                                              |                       |
| ---                                       | ---                                          | ---                   | ---                  |
| **UX Rules**                              | 1\. Filter Status disembunyikan pada Riwayat |                       |                      |
| ---                                       | ---                                          | ---                   | ---                  |
| 2\. Hanya data status "Selesai"           |                                              |                       |
| ---                                       | ---                                          | ---                   | ---                  |
| 3\. Filter lain tetap berfungsi normal    |                                              |                       |
| ---                                       | ---                                          | ---                   | ---                  |
| **Interaksi & Navigasi**                  | Sama dengan filter regular                   |                       |                      |
| ---                                       | ---                                          | ---                   | ---                  |
| **Default Value & Data Source**           | Data Riwayat saja                            |                       |                      |
| ---                                       | ---                                          | ---                   | ---                  |
| **Validasi Field**                        | Sama dengan **LW-SPS-11**                    |                       |                      |
| ---                                       | ---                                          | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**      | Filter diterapkan pada data Riwayat          |                       |                      |
| ---                                       | ---                                          | ---                   | ---                  |
| **Keterkaitan Antar Fitur**               | Perilaku filter spesifik per tab             |                       |                      |
| ---                                       | ---                                          | ---                   | ---                  |
| **Case Preventif**                        | Filter Status otomatis dihilangkan           |                       |                      |
| ---                                       | ---                                          | ---                   | ---                  |

## **Tambah Promo Paket Subscription - Form Tambah Promo Paket Subscription LW-SPS-20**

| **Kategori**                                   | **Rules**                                   | **HW Frontend (jam)** | **HW Backend (jam)** |
| ---------------------------------------------- | ------------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                       | 1\. Header form "Tambah Promo Subscription" |                       |                      |
| ---                                            | ---                                         | ---                   | ---                  |
| 2\. Button back untuk kembali                  |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| 3\. Field form dalam layout vertikal           |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| 4\. Radio button untuk Tipe                    |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| 5\. Indikator field mandatory (\*)             |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**          | 1\. Button back (←)                         |                       |                      |
| ---                                            | ---                                         | ---                   | ---                  |
| 2\. Field Masa Berlaku (2 datetimepicker)      |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| 3\. Radio: Promo Paket (terpilih), Promo Trial |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| 4\. Dropdown Paket                             |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| 5\. Field Harga (disabled)                     |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| 6\. Field Harga Diskon                         |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| 7\. Field Diskon (%)                           |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| 8\. Dropdown Tipe Pengguna                     |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| 9\. Field Kuota                                |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| 10\. Field Kuota per Pembeli, Button Simpan    |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| **UX Rules**                                   | 1\. Promo Paket terpilih secara default     |                       |                      |
| ---                                            | ---                                         | ---                   | ---                  |
| 2\. Field Harga auto-populate dari paket       |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| 3\. Harga Diskon dan Diskon (%) saling terkait |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| 4\. Field mandatory wajib diisi                |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| 5\. Kalkulasi real-time                        |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| **Interaksi & Navigasi**                       | 1\. Switch radio mengubah field form        |                       |                      |
| ---                                            | ---                                         | ---                   | ---                  |
| 2\. Pilihan paket update Harga                 |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| **Default Value & Data Source**                | 1\. Tipe: Promo Paket                       |                       |                      |
| ---                                            | ---                                         | ---                   | ---                  |
| 2\. Field lain: kosong                         |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| 3\. Data paket dari master                     |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| **Validasi Field**                             | 1\. Semua field mandatory wajib terisi      |                       |                      |
| ---                                            | ---                                         | ---                   | ---                  |
| 2\. Harga Diskon < Harga                       |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| 3\. Kuota per Pembeli ≤ Kuota                  |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| 4\. Validasi tanggal                           |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**           | 1\. Simpan berhasil → halaman utama         |                       |                      |
| ---                                            | ---                                         | ---                   | ---                  |
| 2\. Back → konfirmasi jika ada perubahan       |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                    | 1\. Master paket subscription               |                       |                      |
| ---                                            | ---                                         | ---                   | ---                  |
| 2\. Integrasi approval flow                    |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| **Case Preventif**                             | Pengecekan promo duplikat                   |                       |                      |
| ---                                            | ---                                         | ---                   | ---                  |

## **Tambah Promo Paket Subscription - Klik Masa Berlaku LW-SPS-21**

| **Kategori**                                       | **Rules**                                      | **HW Frontend (jam)** | **HW Backend (jam)** |
| -------------------------------------------------- | ---------------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                           | 1\. Popup calendar untuk pilih tanggal         |                       |                      |
| ---                                                | ---                                            | ---                   | ---                  |
| 2\. Navigasi bulan/tahun                           |                                                |                       |
| ---                                                | ---                                            | ---                   | ---                  |
| 3\. Grid tanggal dengan pilihan                    |                                                |                       |
| ---                                                | ---                                            | ---                   | ---                  |
| 4\. Bagian input waktu                             |                                                |                       |
| ---                                                | ---                                            | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**              | 1\. Arrow navigasi bulan                       |                       |                      |
| ---                                                | ---                                            | ---                   | ---                  |
| 2\. Cell tanggal (dapat diklik)                    |                                                |                       |
| ---                                                | ---                                            | ---                   | ---                  |
| 3\. Tanggal terpilih ter-highlight                 |                                                |                       |
| ---                                                | ---                                            | ---                   | ---                  |
| 4\. Button Batal                                   |                                                |                       |
| ---                                                | ---                                            | ---                   | ---                  |
| 5\. Button Terapkan                                |                                                |                       |
| ---                                                | ---                                            | ---                   | ---                  |
| **UX Rules**                                       | 1\. Tanggal lampau disabled                    |                       |                      |
| ---                                                | ---                                            | ---                   | ---                  |
| 2\. Waktu lampau disabled                          |                                                |                       |
| ---                                                | ---                                            | ---                   | ---                  |
| 3\. Jika berakhir terisi dulu, mulai maksimal sama |                                                |                       |
| ---                                                | ---                                            | ---                   | ---                  |
| 4\. Jika mulai terisi dulu, berakhir minimal sama  |                                                |                       |
| ---                                                | ---                                            | ---                   | ---                  |
| 5\. Default tanggal dan waktu saat ini             |                                                |                       |
| ---                                                | ---                                            | ---                   | ---                  |
| **Interaksi & Navigasi**                           | 1\. Pilih tanggal mulai → batasi opsi berakhir |                       |                      |
| ---                                                | ---                                            | ---                   | ---                  |
| 2\. Navigasi bulan/tahun                           |                                                |                       |
| ---                                                | ---                                            | ---                   | ---                  |
| **Default Value & Data Source**                    | 1\. Hari ini sebagai default                   |                       |                      |
| ---                                                | ---                                            | ---                   | ---                  |
| 2\. Waktu saat ini                                 |                                                |                       |
| ---                                                | ---                                            | ---                   | ---                  |
| **Validasi Field**                                 | 1\. Validasi Start ≤ End                       |                       |                      |
| ---                                                | ---                                            | ---                   | ---                  |
| 2\. Tidak boleh tanggal lampau                     |                                                |                       |
| ---                                                | ---                                            | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**               | Terapkan → update field, tutup popup           |                       |                      |
| ---                                                | ---                                            | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                        | Validasi date range                            |                       |                      |
| ---                                                | ---                                            | ---                   | ---                  |
| **Case Preventif**                                 | TIDAK ADA DATA                                 |                       |                      |
| ---                                                | ---                                            | ---                   | ---                  |

## **Tambah Promo Paket Subscription - Klik Paket LW-SPS-22**

| **Kategori**                          | **Rules**                                                 | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------- | --------------------------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**              | 1\. Dropdown terbuka dengan list paket                    |                       |                      |
| ---                                   | ---                                                       | ---                   | ---                  |
| 2\. Single-select dropdown            |                                                           |                       |
| ---                                   | ---                                                       | ---                   | ---                  |
| 3\. Nama paket terdaftar              |                                                           |                       |
| ---                                   | ---                                                       | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif** | 1\. Item dropdown (Starter, Regular, Premium, Enterprise) |                       |                      |
| ---                                   | ---                                                       | ---                   | ---                  |
| 2\. Scroll jika >5 item               |                                                           |                       |
| ---                                   | ---                                                       | ---                   | ---                  |
| **UX Rules**                          | 1\. Hanya bisa pilih satu                                 |                       |                      |
| ---                                   | ---                                                       | ---                   | ---                  |
| 2\. Auto-close setelah pilih          |                                                           |                       |
| ---                                   | ---                                                       | ---                   | ---                  |
| 3\. Item terpilih ter-highlight       |                                                           |                       |
| ---                                   | ---                                                       | ---                   | ---                  |
| **Interaksi & Navigasi**              | Pilih → update field, tutup dropdown                      |                       |                      |
| ---                                   | ---                                                       | ---                   | ---                  |
| **Default Value & Data Source**       | 1\. Paket dari master data                                |                       |                      |
| ---                                   | ---                                                       | ---                   | ---                  |
| 2\. Tidak ada default selection       |                                                           |                       |
| ---                                   | ---                                                       | ---                   | ---                  |
| **Validasi Field**                    | Field wajib diisi                                         |                       |                      |
| ---                                   | ---                                                       | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**  | Pilihan update field Harga                                |                       |                      |
| ---                                   | ---                                                       | ---                   | ---                  |
| **Keterkaitan Antar Fitur**           | Update Harga otomatis                                     |                       |                      |
| ---                                   | ---                                                       | ---                   | ---                  |
| **Case Preventif**                    | TIDAK ADA DATA                                            |                       |                      |
| ---                                   | ---                                                       | ---                   | ---                  |

## **Tambah Promo Paket Subscription - Paket Terpilih LW-SPS-23**

| **Kategori**                                | **Rules**                                   | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------------- | ------------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                    | 1\. Field Paket menampilkan "Starter"       |                       |                      |
| ---                                         | ---                                         | ---                   | ---                  |
| 2\. Field Harga otomatis terisi "Rp300.000" |                                             |                       |
| ---                                         | ---                                         | ---                   | ---                  |
| 3\. Field lain siap diinput                 |                                             |                       |
| ---                                         | ---                                         | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**       | Field Harga (disabled, auto-filled)         |                       |                      |
| ---                                         | ---                                         | ---                   | ---                  |
| **UX Rules**                                | 1\. Harga auto-populate dari paket terpilih |                       |                      |
| ---                                         | ---                                         | ---                   | ---                  |
| 2\. Tidak bisa edit Harga manual            |                                             |                       |
| ---                                         | ---                                         | ---                   | ---                  |
| 3\. Format dengan pemisah ribuan            |                                             |                       |
| ---                                         | ---                                         | ---                   | ---                  |
| 4\. Validasi format currency                |                                             |                       |
| ---                                         | ---                                         | ---                   | ---                  |
| **Interaksi & Navigasi**                    | Ganti paket → update Harga                  |                       |                      |
| ---                                         | ---                                         | ---                   | ---                  |
| **Default Value & Data Source**             | Harga dari master data paket                |                       |                      |
| ---                                         | ---                                         | ---                   | ---                  |
| **Validasi Field**                          | Harga read-only                             |                       |                      |
| ---                                         | ---                                         | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**        | TIDAK ADA                                   |                       |                      |
| ---                                         | ---                                         | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                 | Terkait kalkulasi diskon                    |                       |                      |
| ---                                         | ---                                         | ---                   | ---                  |
| **Case Preventif**                          | Handling perubahan harga                    |                       |                      |
| ---                                         | ---                                         | ---                   | ---                  |

## **Tambah Promo Paket Subscription - Harga Diskon atau Diskon (%) Terisi LW-SPS-24**

| **Kategori**                            | **Rules**                               | **HW Frontend (jam)** | **HW Backend (jam)** |
| --------------------------------------- | --------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                | 1\. Harga Diskon: "Rp 270.000"          |                       |                      |
| ---                                     | ---                                     | ---                   | ---                  |
| 2\. Diskon (%): "10"                    |                                         |                       |
| ---                                     | ---                                     | ---                   | ---                  |
| 3\. Kedua field sinkron                 |                                         |                       |
| ---                                     | ---                                     | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**   | 1\. Field Harga Diskon (editable)       |                       |                      |
| ---                                     | ---                                     | ---                   | ---                  |
| 2\. Field Diskon (%) (editable)         |                                         |                       |
| ---                                     | ---                                     | ---                   | ---                  |
| **UX Rules**                            | 1\. Kalkulasi dua arah otomatis         |                       |                      |
| ---                                     | ---                                     | ---                   | ---                  |
| 2\. Edit Harga Diskon → update Diskon % |                                         |                       |
| ---                                     | ---                                     | ---                   | ---                  |
| 3\. Edit Diskon % → update Harga Diskon |                                         |                       |
| ---                                     | ---                                     | ---                   | ---                  |
| 4\. Format currency otomatis            |                                         |                       |
| ---                                     | ---                                     | ---                   | ---                  |
| 5\. Batas persentase 0-99               |                                         |                       |
| ---                                     | ---                                     | ---                   | ---                  |
| 6\. Handling desimal                    |                                         |                       |
| ---                                     | ---                                     | ---                   | ---                  |
| **Interaksi & Navigasi**                | 1\. Edit Harga Diskon → update Diskon % |                       |                      |
| ---                                     | ---                                     | ---                   | ---                  |
| 2\. Edit Diskon % → update Harga Diskon |                                         |                       |
| ---                                     | ---                                     | ---                   | ---                  |
| **Default Value & Data Source**         | Kalkulasi dari satu sama lain           |                       |                      |
| ---                                     | ---                                     | ---                   | ---                  |
| **Validasi Field**                      | 1\. Harga Diskon < Harga                |                       |                      |
| ---                                     | ---                                     | ---                   | ---                  |
| 2\. Diskon % > 0 dan < 100              |                                         |                       |
| ---                                     | ---                                     | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**    | TIDAK ADA                               |                       |                      |
| ---                                     | ---                                     | ---                   | ---                  |
| **Keterkaitan Antar Fitur**             | Bergantung nilai Harga                  |                       |                      |
| ---                                     | ---                                     | ---                   | ---                  |
| **Case Preventif**                      | TIDAK ADA DATA                          |                       |                      |
| ---                                     | ---                                     | ---                   | ---                  |

## **Tambah Promo Paket Subscription - Klik Tipe Pengguna LW-SPS-25**

| **Kategori**                                                                                                                                                                                                                                                   | **Rules**                         | **HW Frontend (jam)** | **HW Backend (jam)** |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                                                                                                                                                                                                                                       | 1\. Multi-select dropdown terbuka |                       |                      |
| ---                                                                                                                                                                                                                                                            | ---                               | ---                   | ---                  |
| 2\. Search box di atas                                                                                                                                                                                                                                         |                                   |                       |
| ---                                                                                                                                                                                                                                                            | ---                               | ---                   | ---                  |
| 3\. Opsi "Semua Pengguna"                                                                                                                                                                                                                                      |                                   |                       |
| ---                                                                                                                                                                                                                                                            | ---                               | ---                   | ---                  |
| 4\. List tipe pengguna dengan checkbox                                                                                                                                                                                                                         |                                   |                       |
| ---                                                                                                                                                                                                                                                            | ---                               | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**                                                                                                                                                                                                                          | 1\. Field search                  |                       |                      |
| ---                                                                                                                                                                                                                                                            | ---                               | ---                   | ---                  |
| 2\. Opsi "Semua Pengguna"                                                                                                                                                                                                                                      |                                   |                       |
| ---                                                                                                                                                                                                                                                            | ---                               | ---                   | ---                  |
| 3\. 8 checkbox tipe pengguna                                                                                                                                                                                                                                   |                                   |                       |
| ---                                                                                                                                                                                                                                                            | ---                               | ---                   | ---                  |
| 4\. Terpilih ditampilkan sebagai bubble                                                                                                                                                                                                                        |                                   |                       |
| ---                                                                                                                                                                                                                                                            | ---                               | ---                   | ---                  |
| **UX Rules**                                                                                                                                                                                                                                                   | 1\. Multi-select diperbolehkan    |                       |                      |
| ---                                                                                                                                                                                                                                                            | ---                               | ---                   | ---                  |
| 2\. "Semua Pengguna" menghapus pilihan lain                                                                                                                                                                                                                    |                                   |                       |
| ---                                                                                                                                                                                                                                                            | ---                               | ---                   | ---                  |
| 3\. Bubble display untuk terpilih                                                                                                                                                                                                                              |                                   |                       |
| ---                                                                                                                                                                                                                                                            | ---                               | ---                   | ---                  |
| 4\. 10 tipe: Pengguna Baru (Belum memiliki riwayat subscribe), Pengguna Lama (Telah memiliki riwayat subscribe), Penjual muatparts PLUS, Penjual muatparts Mart, Penjual Marketplace, Transporter BF, Shipper BF, Transporter TM, ShipperTM, Shipper muatrans. |                                   |                       |
| ---                                                                                                                                                                                                                                                            | ---                               | ---                   | ---                  |
| 5\. Search untuk filter opsi                                                                                                                                                                                                                                   |                                   |                       |
| ---                                                                                                                                                                                                                                                            | ---                               | ---                   | ---                  |
| **Interaksi & Navigasi**                                                                                                                                                                                                                                       | 1\. Check → tambah ke pilihan     |                       |                      |
| ---                                                                                                                                                                                                                                                            | ---                               | ---                   | ---                  |
| 2\. "Semua Pengguna" → hapus semua                                                                                                                                                                                                                             |                                   |                       |
| ---                                                                                                                                                                                                                                                            | ---                               | ---                   | ---                  |
| **Default Value & Data Source**                                                                                                                                                                                                                                | 1\. 8 tipe pengguna predefined    |                       |                      |
| ---                                                                                                                                                                                                                                                            | ---                               | ---                   | ---                  |
| 2\. Tidak ada default selection                                                                                                                                                                                                                                |                                   |                       |
| ---                                                                                                                                                                                                                                                            | ---                               | ---                   | ---                  |
| **Validasi Field**                                                                                                                                                                                                                                             | Minimal satu wajib dipilih        |                       |                      |
| ---                                                                                                                                                                                                                                                            | ---                               | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**                                                                                                                                                                                                                           | Pilihan update tampilan field     |                       |                      |
| ---                                                                                                                                                                                                                                                            | ---                               | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                                                                                                                                                                                                                                    | Definisi tipe pengguna            |                       |                      |
| ---                                                                                                                                                                                                                                                            | ---                               | ---                   | ---                  |
| **Case Preventif**                                                                                                                                                                                                                                             | Mutual exclusivity dengan "Semua" |                       |                      |
| ---                                                                                                                                                                                                                                                            | ---                               | ---                   | ---                  |

## **Tambah Promo Paket Subscription - Form Terisi LW-SPS-26**

| **Kategori**                          | **Rules**                      | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------- | ------------------------------ | --------------------- | -------------------- |
| **Komponen UI & Layout**              | 1\. Semua field terisi lengkap |                       |                      |
| ---                                   | ---                            | ---                   | ---                  |
| 2\. Siap untuk submit                 |                                |                       |
| ---                                   | ---                            | ---                   | ---                  |
| 3\. Form dalam state lengkap          |                                |                       |
| ---                                   | ---                            | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif** | 1\. Semua field form terisi    |                       |                      |
| ---                                   | ---                            | ---                   | ---                  |
| 2\. Button Simpan enabled             |                                |                       |
| ---                                   | ---                            | ---                   | ---                  |
| **UX Rules**                          | 1\. Simpan enabled saat valid  |                       |                      |
| ---                                   | ---                            | ---                   | ---                  |
| 2\. Visual feedback validasi          |                                |                       |
| ---                                   | ---                            | ---                   | ---                  |
| 3\. Indikator kelengkapan field       |                                |                       |
| ---                                   | ---                            | ---                   | ---                  |
| **Interaksi & Navigasi**              | Simpan → validasi → save       |                       |                      |
| ---                                   | ---                            | ---                   | ---                  |
| **Default Value & Data Source**       | Data input user                |                       |                      |
| ---                                   | ---                            | ---                   | ---                  |
| **Validasi Field**                    | Semua validasi aktif           |                       |                      |
| ---                                   | ---                            | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**  | Simpan → popup konfirmasi      |                       |                      |
| ---                                   | ---                            | ---                   | ---                  |
| **Keterkaitan Antar Fitur**           | Siap untuk approval flow       |                       |                      |
| ---                                   | ---                            | ---                   | ---                  |
| **Case Preventif**                    | TIDAK ADA DATA                 |                       |                      |
| ---                                   | ---                            | ---                   | ---                  |

## **Tambah Promo Paket Subscription - Form Terisi - Semua Pengguna LW-SPS-27**

| **Kategori**                                           | **Rules**                                             | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------------------------ | ----------------------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                               | 1\. Tipe Pengguna menampilkan bubble "Semua Pengguna" |                       |                      |
| ---                                                    | ---                                                   | ---                   | ---                  |
| 2\. Single bubble daripada multiple                    |                                                       |                       |
| ---                                                    | ---                                                   | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**                  | Bubble "Semua Pengguna" dengan X                      |                       |                      |
| ---                                                    | ---                                                   | ---                   | ---                  |
| **UX Rules**                                           | 1\. Tampilan sederhana untuk "semua"                  |                       |                      |
| ---                                                    | ---                                                   | ---                   | ---                  |
| 2\. Tidak bisa tambah individual saat "Semua" terpilih |                                                       |                       |
| ---                                                    | ---                                                   | ---                   | ---                  |
| 3\. Opsi "Semua Pengguna" override pilihan individual  |                                                       |                       |
| ---                                                    | ---                                                   | ---                   | ---                  |
| **Interaksi & Navigasi**                               | X pada bubble → hapus pilihan                         |                       |                      |
| ---                                                    | ---                                                   | ---                   | ---                  |
| **Default Value & Data Source**                        | Pilihan "Semua Pengguna"                              |                       |                      |
| ---                                                    | ---                                                   | ---                   | ---                  |
| **Validasi Field**                                     | Sama dengan **LW-SPS-26**                             |                       |                      |
| ---                                                    | ---                                                   | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**                   | Sama dengan **LW-SPS-26**                             |                       |                      |
| ---                                                    | ---                                                   | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                            | Berlaku untuk semua tipe pengguna                     |                       |                      |
| ---                                                    | ---                                                   | ---                   | ---                  |
| **Case Preventif**                                     | Override pilihan individual                           |                       |                      |
| ---                                                    | ---                                                   | ---                   | ---                  |

## **Tambah Promo Paket Subscription - Pop up Konfirmasi Simpan LW-SPS-28**

| **Kategori**                                 | **Rules**                                  | **HW Frontend (jam)** | **HW Backend (jam)** |
| -------------------------------------------- | ------------------------------------------ | --------------------- | -------------------- |
| **Komponen UI & Layout**                     | 1\. Modal overlay dengan background dimmed |                       |                      |
| ---                                          | ---                                        | ---                   | ---                  |
| 2\. Popup dengan judul "Pemberitahuan"       |                                            |                       |
| ---                                          | ---                                        | ---                   | ---                  |
| 3\. Teks pesan konfirmasi                    |                                            |                       |
| ---                                          | ---                                        | ---                   | ---                  |
| 4\. Dua button aksi                          |                                            |                       |
| ---                                          | ---                                        | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**        | 1\. Button Batal                           |                       |                      |
| ---                                          | ---                                        | ---                   | ---                  |
| 2\. Button Simpan                            |                                            |                       |
| ---                                          | ---                                        | ---                   | ---                  |
| 3\. Button X untuk tutup                     |                                            |                       |
| ---                                          | ---                                        | ---                   | ---                  |
| **UX Rules**                                 | 1\. Modal memblokir interaksi              |                       |                      |
| ---                                          | ---                                        | ---                   | ---                  |
| 2\. "Apakah anda yakin akan menyimpan data?" |                                            |                       |
| ---                                          | ---                                        | ---                   | ---                  |
| 3\. Focus trap dalam modal                   |                                            |                       |
| ---                                          | ---                                        | ---                   | ---                  |
| **Interaksi & Navigasi**                     | 1\. Batal/X → tutup modal                  |                       |                      |
| ---                                          | ---                                        | ---                   | ---                  |
| 2\. Simpan → proses simpan                   |                                            |                       |
| ---                                          | ---                                        | ---                   | ---                  |
| **Default Value & Data Source**              | TIDAK ADA                                  |                       |                      |
| ---                                          | ---                                        | ---                   | ---                  |
| **Validasi Field**                           | TIDAK ADA                                  |                       |                      |
| ---                                          | ---                                        | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**         | Simpan → popup sukses                      |                       |                      |
| ---                                          | ---                                        | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                  | Trigger proses simpan                      |                       |                      |
| ---                                          | ---                                        | ---                   | ---                  |
| **Case Preventif**                           | TIDAK ADA DATA                             |                       |                      |
| ---                                          | ---                                        | ---                   | ---                  |

## **Tambah Promo Paket Subscription - Berhasil Simpan LW-SPS-29**

| **Kategori**                                      | **Rules**                                     | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------------------- | --------------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                          | 1\. Popup sukses dengan animasi checkmark     |                       |                      |
| ---                                               | ---                                           | ---                   | ---                  |
| 2\. Pesan "Data berhasil disimpan"                |                                               |                       |
| ---                                               | ---                                           | ---                   | ---                  |
| 3\. Single button OK                              |                                               |                       |
| ---                                               | ---                                           | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**             | Button OK                                     |                       |                      |
| ---                                               | ---                                           | ---                   | ---                  |
| **UX Rules**                                      | 1\. Animasi sukses berjalan                   |                       |                      |
| ---                                               | ---                                           | ---                   | ---                  |
| 2\. Auto-close setelah delay                      |                                               |                       |
| ---                                               | ---                                           | ---                   | ---                  |
| 3\. User dengan approval: data langsung tersimpan |                                               |                       |
| ---                                               | ---                                           | ---                   | ---                  |
| 4\. User tanpa approval: masuk ke pengajuan       |                                               |                       |
| ---                                               | ---                                           | ---                   | ---                  |
| **Interaksi & Navigasi**                          | OK → halaman utama                            |                       |                      |
| ---                                               | ---                                           | ---                   | ---                  |
| **Default Value & Data Source**                   | TIDAK ADA                                     |                       |                      |
| ---                                               | ---                                           | ---                   | ---                  |
| **Validasi Field**                                | TIDAK ADA                                     |                       |                      |
| ---                                               | ---                                           | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**              | OK → Halaman Setting Promo Subscription       |                       |                      |
| ---                                               | ---                                           | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                       | Membuat request approval jika diperlukan      |                       |                      |
| ---                                               | ---                                           | ---                   | ---                  |
| **Case Preventif**                                | Flow berbeda untuk user approval/non-approval |                       |                      |
| ---                                               | ---                                           | ---                   | ---                  |

## **Tambah Promo Paket Subscription - Field Kosong LW-SPS-30**

| **Kategori**                                 | **Rules**                            | **HW Frontend (jam)** | **HW Backend (jam)** |
| -------------------------------------------- | ------------------------------------ | --------------------- | -------------------- |
| **Komponen UI & Layout**                     | 1\. Popup warning                    |                       |                      |
| ---                                          | ---                                  | ---                   | ---                  |
| 2\. Pesan "Terdapat field yang kosong"       |                                      |                       |
| ---                                          | ---                                  | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**        | Button X untuk tutup                 |                       |                      |
| ---                                          | ---                                  | ---                   | ---                  |
| **UX Rules**                                 | 1\. Highlight field mandatory kosong |                       |                      |
| ---                                          | ---                                  | ---                   | ---                  |
| 2\. Focus field kosong pertama setelah tutup |                                      |                       |
| ---                                          | ---                                  | ---                   | ---                  |
| **Interaksi & Navigasi**                     | X → tutup, focus field kosong        |                       |                      |
| ---                                          | ---                                  | ---                   | ---                  |
| **Default Value & Data Source**              | TIDAK ADA                            |                       |                      |
| ---                                          | ---                                  | ---                   | ---                  |
| **Validasi Field**                           | Pengecekan field mandatory           |                       |                      |
| ---                                          | ---                                  | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**         | Tetap di form                        |                       |                      |
| ---                                          | ---                                  | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                  | Sistem validasi form                 |                       |                      |
| ---                                          | ---                                  | ---                   | ---                  |
| **Case Preventif**                           | TIDAK ADA DATA                       |                       |                      |
| ---                                          | ---                                  | ---                   | ---                  |

## **Tambah Promo Paket Subscription - Promo Paket Sama LW-SPS-31**

| **Kategori**                                              | **Rules**                       | **HW Frontend (jam)** | **HW Backend (jam)** |
| --------------------------------------------------------- | ------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                                  | 1\. Popup warning               |                       |                      |
| ---                                                       | ---                             | ---                   | ---                  |
| 2\. Pesan "Terdapat promo yang sama"                      |                                 |                       |
| ---                                                       | ---                             | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**                     | Button X untuk tutup            |                       |                      |
| ---                                                       | ---                             | ---                   | ---                  |
| **UX Rules**                                              | 1\. Cek duplikat sebelum simpan |                       |                      |
| ---                                                       | ---                             | ---                   | ---                  |
| 2\. Cek Paket dan Tipe Pengguna yang sama di periode sama |                                 |                       |
| ---                                                       | ---                             | ---                   | ---                  |
| 3\. Jika "Semua Pengguna", cek paket saja di periode sama |                                 |                       |
| ---                                                       | ---                             | ---                   | ---                  |
| **Interaksi & Navigasi**                                  | X → tutup popup                 |                       |                      |
| ---                                                       | ---                             | ---                   | ---                  |
| **Default Value & Data Source**                           | TIDAK ADA                       |                       |                      |
| ---                                                       | ---                             | ---                   | ---                  |
| **Validasi Field**                                        | Validasi promo duplikat         |                       |                      |
| ---                                                       | ---                             | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**                      | Tetap di form                   |                       |                      |
| ---                                                       | ---                             | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                               | Cek promo existing              |                       |                      |
| ---                                                       | ---                             | ---                   | ---                  |
| **Case Preventif**                                        | Cek periode overlap             |                       |                      |
| ---                                                       | ---                             | ---                   | ---                  |

## **Tambah Promo Paket Subscription - Harga Diskon >= Harga Normal LW-SPS-32**

| **Kategori**                                         | **Rules**                  | **HW Frontend (jam)** | **HW Backend (jam)** |
| ---------------------------------------------------- | -------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                             | 1\. Popup warning          |                       |                      |
| ---                                                  | ---                        | ---                   | ---                  |
| 2\. Pesan "Harga diskon harus di bawah harga normal" |                            |                       |
| ---                                                  | ---                        | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**                | Button X untuk tutup       |                       |                      |
| ---                                                  | ---                        | ---                   | ---                  |
| **UX Rules**                                         | 1\. Validasi logika diskon |                       |                      |
| ---                                                  | ---                        | ---                   | ---                  |
| 2\. Harga diskon harus < harga normal                |                            |                       |
| ---                                                  | ---                        | ---                   | ---                  |
| 3\. Highlight field error                            |                            |                       |
| ---                                                  | ---                        | ---                   | ---                  |
| **Interaksi & Navigasi**                             | X → tutup, focus field     |                       |                      |
| ---                                                  | ---                        | ---                   | ---                  |
| **Default Value & Data Source**                      | TIDAK ADA                  |                       |                      |
| ---                                                  | ---                        | ---                   | ---                  |
| **Validasi Field**                                   | Validasi harga diskon      |                       |                      |
| ---                                                  | ---                        | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**                 | Tetap di form              |                       |                      |
| ---                                                  | ---                        | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                          | Logika kalkulasi harga     |                       |                      |
| ---                                                  | ---                        | ---                   | ---                  |
| **Case Preventif**                                   | TIDAK ADA DATA             |                       |                      |
| ---                                                  | ---                        | ---                   | ---                  |

## **Tambah Promo Paket Subscription - Kuota per Pembeli > Kuota LW-SPS-33**

| **Kategori**                                 | **Rules**                 | **HW Frontend (jam)** | **HW Backend (jam)** |
| -------------------------------------------- | ------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                     | 1\. Popup warning         |                       |                      |
| ---                                          | ---                       | ---                   | ---                  |
| 2\. Pesan "Kuota per Pembeli melebihi kuota" |                           |                       |
| ---                                          | ---                       | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**        | Button X untuk tutup      |                       |                      |
| ---                                          | ---                       | ---                   | ---                  |
| **UX Rules**                                 | 1\. Validasi logika kuota |                       |                      |
| ---                                          | ---                       | ---                   | ---                  |
| 2\. Kuota per Pembeli harus ≤ Kuota total    |                           |                       |
| ---                                          | ---                       | ---                   | ---                  |
| 3\. Highlight field konflik                  |                           |                       |
| ---                                          | ---                       | ---                   | ---                  |
| **Interaksi & Navigasi**                     | X → tutup popup           |                       |                      |
| ---                                          | ---                       | ---                   | ---                  |
| **Default Value & Data Source**              | TIDAK ADA                 |                       |                      |
| ---                                          | ---                       | ---                   | ---                  |
| **Validasi Field**                           | Validasi logika kuota     |                       |                      |
| ---                                          | ---                       | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**         | Tetap di form             |                       |                      |
| ---                                          | ---                       | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                  | Logika manajemen kuota    |                       |                      |
| ---                                          | ---                       | ---                   | ---                  |
| **Case Preventif**                           | TIDAK ADA DATA            |                       |                      |
| ---                                          | ---                       | ---                   | ---                  |

## **Tambah Promo Paket Subscription - Konfirmasi Keluar Halaman LW-SPS-34**

| **Kategori**                                              | **Rules**                             | **HW Frontend (jam)** | **HW Backend (jam)** |
| --------------------------------------------------------- | ------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                                  | 1\. Popup warning                     |                       |                      |
| ---                                                       | ---                                   | ---                   | ---                  |
| 2\. Pesan "Anda belum menyimpan data!"                    |                                       |                       |
| ---                                                       | ---                                   | ---                   | ---                  |
| 3\. Dua button aksi                                       |                                       |                       |
| ---                                                       | ---                                   | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**                     | 1\. Button Lanjutkan                  |                       |                      |
| ---                                                       | ---                                   | ---                   | ---                  |
| 2\. Button Simpan                                         |                                       |                       |
| ---                                                       | ---                                   | ---                   | ---                  |
| 3\. Button X untuk tutup                                  |                                       |                       |
| ---                                                       | ---                                   | ---                   | ---                  |
| **UX Rules**                                              | 1\. Deteksi perubahan belum tersimpan |                       |                      |
| ---                                                       | ---                                   | ---                   | ---                  |
| 2\. Cegah kehilangan data tidak sengaja                   |                                       |                       |
| ---                                                       | ---                                   | ---                   | ---                  |
| 3\. Muncul saat klik back/menu lain setelah ada perubahan |                                       |                       |
| ---                                                       | ---                                   | ---                   | ---                  |
| **Interaksi & Navigasi**                                  | 1\. Lanjutkan → buang data, navigasi  |                       |                      |
| ---                                                       | ---                                   | ---                   | ---                  |
| 2\. Simpan → validasi dan simpan                          |                                       |                       |
| ---                                                       | ---                                   | ---                   | ---                  |
| **Default Value & Data Source**                           | TIDAK ADA                             |                       |                      |
| ---                                                       | ---                                   | ---                   | ---                  |
| **Validasi Field**                                        | Cek dirty state                       |                       |                      |
| ---                                                       | ---                                   | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**                      | 1\. Lanjutkan → halaman target        |                       |                      |
| ---                                                       | ---                                   | ---                   | ---                  |
| 2\. Simpan → flow simpan                                  |                                       |                       |
| ---                                                       | ---                                   | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                               | Sistem navigation guard               |                       |                      |
| ---                                                       | ---                                   | ---                   | ---                  |
| **Case Preventif**                                        | TIDAK ADA DATA                        |                       |                      |
| ---                                                       | ---                                   | ---                   | ---                  |

## **Tambah Promo Trial Subscription - Form Tambah Promo Trial Subscription LW-SPS-35**

| **Kategori**                                          | **Rules**                                | **HW Frontend (jam)** | **HW Backend (jam)** |
| ----------------------------------------------------- | ---------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                              | 1\. Form dengan field khusus Trial       |                       |                      |
| ---                                                   | ---                                      | ---                   | ---                  |
| 2\. Radio "Promo Trial" terpilih                      |                                          |                       |
| ---                                                   | ---                                      | ---                   | ---                  |
| 3\. Set field berbeda dari Paket                      |                                          |                       |
| ---                                                   | ---                                      | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**                 | 1\. Field Masa Berlaku                   |                       |                      |
| ---                                                   | ---                                      | ---                   | ---                  |
| 2\. Radio Tipe (Trial terpilih)                       |                                          |                       |
| ---                                                   | ---                                      | ---                   | ---                  |
| 3\. Dropdown Periode Trial (hari)                     |                                          |                       |
| ---                                                   | ---                                      | ---                   | ---                  |
| 4\. Radio Wajib Subscription                          |                                          |                       |
| ---                                                   | ---                                      | ---                   | ---                  |
| 5\. Dropdown Paket (kondisional)                      |                                          |                       |
| ---                                                   | ---                                      | ---                   | ---                  |
| 6\. Dropdown Tipe Pengguna                            |                                          |                       |
| ---                                                   | ---                                      | ---                   | ---                  |
| 7\. Field Kuota                                       |                                          |                       |
| ---                                                   | ---                                      | ---                   | ---                  |
| 8\. Button Simpan                                     |                                          |                       |
| ---                                                   | ---                                      | ---                   | ---                  |
| **UX Rules**                                          | 1\. Form Trial menampilkan field berbeda |                       |                      |
| ---                                                   | ---                                      | ---                   | ---                  |
| 2\. Wajib Subscription default: Ya (Wajib Beli Paket) |                                          |                       |
| ---                                                   | ---                                      | ---                   | ---                  |
| 3\. Tipe Pengguna selalu wajib dipilih                |                                          |                       |
| ---                                                   | ---                                      | ---                   | ---                  |
| 4\. Field Paket muncul jika Wajib Beli Paket          |                                          |                       |
| ---                                                   | ---                                      | ---                   | ---                  |
| 5\. Auto-set tipe pengguna ke "Pengguna Baru"         |                                          |                       |
| ---                                                   | ---                                      | ---                   | ---                  |
| **Interaksi & Navigasi**                              | Radio Wajib → show/hide Paket            |                       |                      |
| ---                                                   | ---                                      | ---                   | ---                  |
| **Default Value & Data Source**                       | 1\. Opsi Periode Trial                   |                       |                      |
| ---                                                   | ---                                      | ---                   | ---                  |
| 2\. Wajib: Ya (default)                               |                                          |                       |
| ---                                                   | ---                                      | ---                   | ---                  |
| **Validasi Field**                                    | 1\. Validasi khusus Trial                |                       |                      |
| ---                                                   | ---                                      | ---                   | ---                  |
| 2\. Periode Trial wajib diisi                         |                                          |                       |
| ---                                                   | ---                                      | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**                  | Sama dengan Promo Paket                  |                       |                      |
| ---                                                   | ---                                      | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                           | Logika trial subscription                |                       |                      |
| ---                                                   | ---                                      | ---                   | ---                  |
| **Case Preventif**                                    | TIDAK ADA DATA                           |                       |                      |
| ---                                                   | ---                                      | ---                   | ---                  |

## **Tambah Promo Trial Subscription - Klik Paket LW-SPS-36**

| **Kategori**                             | **Rules**                             | **HW Frontend (jam)** | **HW Backend (jam)** |
| ---------------------------------------- | ------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                 | 1\. Multi-select dropdown untuk Paket |                       |                      |
| ---                                      | ---                                   | ---                   | ---                  |
| 2\. Opsi "Semua Paket" tersedia          |                                       |                       |
| ---                                      | ---                                   | ---                   | ---                  |
| 3\. Checkbox untuk pilihan               |                                       |                       |
| ---                                      | ---                                   | ---                   | ---                  |
| 4\. Terpilih sebagai bubble              |                                       |                       |
| ---                                      | ---                                   | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**    | 1\. Field search                      |                       |                      |
| ---                                      | ---                                   | ---                   | ---                  |
| 2\. Opsi "Semua Paket"                   |                                       |                       |
| ---                                      | ---                                   | ---                   | ---                  |
| 3\. Checkbox paket                       |                                       |                       |
| ---                                      | ---                                   | ---                   | ---                  |
| 4\. Terpilih sebagai bubble              |                                       |                       |
| ---                                      | ---                                   | ---                   | ---                  |
| **UX Rules**                             | 1\. Multi-select untuk Trial          |                       |                      |
| ---                                      | ---                                   | ---                   | ---                  |
| 2\. "Semua Paket" menghapus pilihan lain |                                       |                       |
| ---                                      | ---                                   | ---                   | ---                  |
| 3\. Dapat pilih lebih dari 1 paket       |                                       |                       |
| ---                                      | ---                                   | ---                   | ---                  |
| 4\. Berbeda dari Promo Paket (single)    |                                       |                       |
| ---                                      | ---                                   | ---                   | ---                  |
| **Interaksi & Navigasi**                 | 1\. Check multiple paket              |                       |                      |
| ---                                      | ---                                   | ---                   | ---                  |
| 2\. "Semua Paket" → hapus individual     |                                       |                       |
| ---                                      | ---                                   | ---                   | ---                  |
| **Default Value & Data Source**          | 1\. Master data paket                 |                       |                      |
| ---                                      | ---                                   | ---                   | ---                  |
| 2\. Tidak ada default selection          |                                       |                       |
| ---                                      | ---                                   | ---                   | ---                  |
| **Validasi Field**                       | Minimal satu wajib jika Wajib         |                       |                      |
| ---                                      | ---                                   | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**     | Update tampilan field                 |                       |                      |
| ---                                      | ---                                   | ---                   | ---                  |
| **Keterkaitan Antar Fitur**              | Pemilihan paket trial                 |                       |                      |
| ---                                      | ---                                   | ---                   | ---                  |
| **Case Preventif**                       | Perbedaan multi vs single select      |                       |                      |
| ---                                      | ---                                   | ---                   | ---                  |

## **Tambah Promo Trial Subscription - Form Terisi LW-SPS-37**

| **Kategori**                          | **Rules**                    | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------- | ---------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**              | 1\. Semua field Trial terisi |                       |                      |
| ---                                   | ---                          | ---                   | ---                  |
| 2\. Multiple bubble paket ditampilkan |                              |                       |
| ---                                   | ---                          | ---                   | ---                  |
| 3\. Siap untuk submit                 |                              |                       |
| ---                                   | ---                          | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif** | 1\. Field form Trial terisi  |                       |                      |
| ---                                   | ---                          | ---                   | ---                  |
| 2\. Bubble paket dengan X             |                              |                       |
| ---                                   | ---                          | ---                   | ---                  |
| **UX Rules**                          | 1\. Aturan validasi Trial    |                       |                      |
| ---                                   | ---                          | ---                   | ---                  |
| 2\. Visual feedback kelengkapan       |                              |                       |
| ---                                   | ---                          | ---                   | ---                  |
| 3\. Multiple paket dapat dipilih      |                              |                       |
| ---                                   | ---                          | ---                   | ---                  |
| **Interaksi & Navigasi**              | 1\. Hapus paket via X        |                       |                      |
| ---                                   | ---                          | ---                   | ---                  |
| 2\. Submit via Simpan                 |                              |                       |
| ---                                   | ---                          | ---                   | ---                  |
| **Default Value & Data Source**       | Data Trial input user        |                       |                      |
| ---                                   | ---                          | ---                   | ---                  |
| **Validasi Field**                    | Validasi khusus Trial        |                       |                      |
| ---                                   | ---                          | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**  | Simpan → konfirmasi          |                       |                      |
| ---                                   | ---                          | ---                   | ---                  |
| **Keterkaitan Antar Fitur**           | Pembuatan promo Trial        |                       |                      |
| ---                                   | ---                          | ---                   | ---                  |
| **Case Preventif**                    | TIDAK ADA DATA               |                       |                      |
| ---                                   | ---                          | ---                   | ---                  |

## **Tambah Promo Trial Subscription - Form Terisi - Semua Paket LW-SPS-38**

| **Kategori**                          | **Rules**                       | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------- | ------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**              | 1\. Single bubble "Semua Paket" |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| 2\. Tampilan sederhana                |                                 |                       |
| ---                                   | ---                             | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif** | Bubble "Semua Paket"            |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| **UX Rules**                          | 1\. Single bubble untuk semua   |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| 2\. Tidak bisa tambah individual      |                                 |                       |
| ---                                   | ---                             | ---                   | ---                  |
| 3\. "Semua Paket" berlaku untuk semua |                                 |                       |
| ---                                   | ---                             | ---                   | ---                  |
| **Interaksi & Navigasi**              | X → hapus pilihan               |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| **Default Value & Data Source**       | "Semua Paket" terpilih          |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| **Validasi Field**                    | Sama dengan **LW-SPS-37**       |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**  | Sama dengan **LW-SPS-37**       |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| **Keterkaitan Antar Fitur**           | Berlaku untuk semua paket       |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| **Case Preventif**                    | Override pilihan individual     |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |

## **Tambah Promo Trial Subscription - Pop up Konfirmasi Simpan LW-SPS-39**

| **Kategori**                           | **Rules**                 | **HW Frontend (jam)** | **HW Backend (jam)** |
| -------------------------------------- | ------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**               | 1\. Modal konfirmasi      |                       |                      |
| ---                                    | ---                       | ---                   | ---                  |
| 2\. Sama dengan konfirmasi Promo Paket |                           |                       |
| ---                                    | ---                       | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**  | 1\. Button Batal          |                       |                      |
| ---                                    | ---                       | ---                   | ---                  |
| 2\. Button Simpan                      |                           |                       |
| ---                                    | ---                       | ---                   | ---                  |
| 3\. Button X tutup                     |                           |                       |
| ---                                    | ---                       | ---                   | ---                  |
| **UX Rules**                           | Sama dengan **LW-SPS-28** |                       |                      |
| ---                                    | ---                       | ---                   | ---                  |
| **Interaksi & Navigasi**               | Sama dengan **LW-SPS-28** |                       |                      |
| ---                                    | ---                       | ---                   | ---                  |
| **Default Value & Data Source**        | TIDAK ADA                 |                       |                      |
| ---                                    | ---                       | ---                   | ---                  |
| **Validasi Field**                     | TIDAK ADA                 |                       |                      |
| ---                                    | ---                       | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**   | Simpan → popup sukses     |                       |                      |
| ---                                    | ---                       | ---                   | ---                  |
| **Keterkaitan Antar Fitur**            | Proses simpan Trial       |                       |                      |
| ---                                    | ---                       | ---                   | ---                  |
| **Case Preventif**                     | TIDAK ADA DATA            |                       |                      |
| ---                                    | ---                       | ---                   | ---                  |

## **Tambah Promo Trial Subscription - Berhasil Simpan LW-SPS-40**

| **Kategori**                               | **Rules**                       | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------------ | ------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                   | 1\. Popup sukses dengan animasi |                       |                      |
| ---                                        | ---                             | ---                   | ---                  |
| 2\. UI sukses sama dengan Promo Paket      |                                 |                       |
| ---                                        | ---                             | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**      | Button OK                       |                       |                      |
| ---                                        | ---                             | ---                   | ---                  |
| **UX Rules**                               | 1\. Feedback sukses             |                       |                      |
| ---                                        | ---                             | ---                   | ---                  |
| 2\. Tipe Pengguna otomatis "Pengguna Baru" |                                 |                       |
| ---                                        | ---                             | ---                   | ---                  |
| 3\. Trial auto-assigns "Pengguna Baru"     |                                 |                       |
| ---                                        | ---                             | ---                   | ---                  |
| **Interaksi & Navigasi**                   | OK → halaman utama              |                       |                      |
| ---                                        | ---                             | ---                   | ---                  |
| **Default Value & Data Source**            | TIDAK ADA                       |                       |                      |
| ---                                        | ---                             | ---                   | ---                  |
| **Validasi Field**                         | TIDAK ADA                       |                       |                      |
| ---                                        | ---                             | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**       | OK → Setting Promo Subscription |                       |                      |
| ---                                        | ---                             | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                | Membuat promo Trial             |                       |                      |
| ---                                        | ---                             | ---                   | ---                  |
| **Case Preventif**                         | Tipe pengguna auto-set          |                       |                      |
| ---                                        | ---                             | ---                   | ---                  |

## **Tambah Promo Trial Subscription - Tidak Wajib Beli Paket LW-SPS-41**

| **Kategori**                                   | **Rules**                                   | **HW Frontend (jam)** | **HW Backend (jam)** |
| ---------------------------------------------- | ------------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                       | 1\. Radio "Tidak Wajib Beli Paket" terpilih |                       |                      |
| ---                                            | ---                                         | ---                   | ---                  |
| 2\. Field Paket disembunyikan                  |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| 3\. Form lebih sederhana                       |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**          | 1\. Opsi radio Wajib Subscription           |                       |                      |
| ---                                            | ---                                         | ---                   | ---                  |
| 2\. Field Paket dihilangkan                    |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| **UX Rules**                                   | 1\. Field Paket di-reset dan disembunyikan  |                       |                      |
| ---                                            | ---                                         | ---                   | ---                  |
| 2\. Berlaku untuk semua paket otomatis         |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| 3\. User tidak perlu bayar di awal             |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| 4\. Dapat semua benefit selama trial           |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| 5\. Konsep free trial                          |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| 6\. Tidak ada kewajiban upgrade di akhir trial |                                             |                       |
| ---                                            | ---                                         | ---                   | ---                  |
| **Interaksi & Navigasi**                       | Toggle radio → show/hide Paket              |                       |                      |
| ---                                            | ---                                         | ---                   | ---                  |
| **Default Value & Data Source**                | State pilihan radio                         |                       |                      |
| ---                                            | ---                                         | ---                   | ---                  |
| **Validasi Field**                             | Paket tidak wajib                           |                       |                      |
| ---                                            | ---                                         | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**           | TIDAK ADA                                   |                       |                      |
| ---                                            | ---                                         | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                    | Free trial tanpa pembayaran                 |                       |                      |
| ---                                            | ---                                         | ---                   | ---                  |
| **Case Preventif**                             | Auto-apply ke semua paket                   |                       |                      |
| ---                                            | ---                                         | ---                   | ---                  |

## **Tambah Promo Trial Subscription - Field Kosong LW-SPS-42**

| **Kategori**                          | **Rules**                  | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------- | -------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**              | 1\. Popup warning          |                       |                      |
| ---                                   | ---                        | ---                   | ---                  |
| 2\. Sama dengan validasi Promo Paket  |                            |                       |
| ---                                   | ---                        | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif** | Button X untuk tutup       |                       |                      |
| ---                                   | ---                        | ---                   | ---                  |
| **UX Rules**                          | 1\. Highlight field kosong |                       |                      |
| ---                                   | ---                        | ---                   | ---                  |
| 2\. Manajemen focus                   |                            |                       |
| ---                                   | ---                        | ---                   | ---                  |
| 3\. Pengecekan field khusus Trial     |                            |                       |
| ---                                   | ---                        | ---                   | ---                  |
| **Interaksi & Navigasi**              | X → tutup popup            |                       |                      |
| ---                                   | ---                        | ---                   | ---                  |
| **Default Value & Data Source**       | TIDAK ADA                  |                       |                      |
| ---                                   | ---                        | ---                   | ---                  |
| **Validasi Field**                    | Field mandatory Trial      |                       |                      |
| ---                                   | ---                        | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**  | Tetap di form              |                       |                      |
| ---                                   | ---                        | ---                   | ---                  |
| **Keterkaitan Antar Fitur**           | Sistem validasi Trial      |                       |                      |
| ---                                   | ---                        | ---                   | ---                  |
| **Case Preventif**                    | TIDAK ADA DATA             |                       |                      |
| ---                                   | ---                        | ---                   | ---                  |

## **Tambah Promo Trial Subscription - Promo Trial Sama LW-SPS-43**

| **Kategori**                          | **Rules**               | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------- | ----------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**              | 1\. Popup warning       |                       |                      |
| ---                                   | ---                     | ---                   | ---                  |
| 2\. Pesan "Terdapat promo yang sama"  |                         |                       |
| ---                                   | ---                     | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif** | Button X untuk tutup    |                       |                      |
| ---                                   | ---                     | ---                   | ---                  |
| **UX Rules**                          | 1\. Cek duplikat Trial  |                       |                      |
| ---                                   | ---                     | ---                   | ---                  |
| 2\. Cek overlap periode               |                         |                       |
| ---                                   | ---                     | ---                   | ---                  |
| 3\. Aturan satu trial per periode     |                         |                       |
| ---                                   | ---                     | ---                   | ---                  |
| **Interaksi & Navigasi**              | X → tutup popup         |                       |                      |
| ---                                   | ---                     | ---                   | ---                  |
| **Default Value & Data Source**       | TIDAK ADA               |                       |                      |
| ---                                   | ---                     | ---                   | ---                  |
| **Validasi Field**                    | Validasi Trial duplikat |                       |                      |
| ---                                   | ---                     | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**  | Tetap di form           |                       |                      |
| ---                                   | ---                     | ---                   | ---                  |
| **Keterkaitan Antar Fitur**           | Cek trial existing      |                       |                      |
| ---                                   | ---                     | ---                   | ---                  |
| **Case Preventif**                    | Aturan keunikan Trial   |                       |                      |
| ---                                   | ---                     | ---                   | ---                  |

## **Ubah Promo Subscription - Form Ubah Promo Paket - Akan Datang LW-SPS-44**

| **Kategori**                                | **Rules**                                          | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------------- | -------------------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                    | 1\. Form edit dengan data pre-filled               |                       |                      |
| ---                                         | ---                                                | ---                   | ---                  |
| 2\. Field ID Promo (disabled)               |                                                    |                       |
| ---                                         | ---                                                | ---                   | ---                  |
| 3\. Link Kuota Terpakai                     |                                                    |                       |
| ---                                         | ---                                                | ---                   | ---                  |
| 4\. Tabel Riwayat Perubahan                 |                                                    |                       |
| ---                                         | ---                                                | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**       | 1\. Semua field form (beberapa editable)           |                       |                      |
| ---                                         | ---                                                | ---                   | ---                  |
| 2\. ID Promo (disabled)                     |                                                    |                       |
| ---                                         | ---                                                | ---                   | ---                  |
| 3\. Tipe (disabled)                         |                                                    |                       |
| ---                                         | ---                                                | ---                   | ---                  |
| 4\. Kuota Terpakai (link)                   |                                                    |                       |
| ---                                         | ---                                                | ---                   | ---                  |
| 5\. Button Simpan                           |                                                    |                       |
| ---                                         | ---                                                | ---                   | ---                  |
| **UX Rules**                                | 1\. Pre-populate semua field                       |                       |                      |
| ---                                         | ---                                                | ---                   | ---                  |
| 2\. Field ID dan Tipe disabled              |                                                    |                       |
| ---                                         | ---                                                | ---                   | ---                  |
| 3\. Link Kuota Terpakai ke transaksi detail |                                                    |                       |
| ---                                         | ---                                                | ---                   | ---                  |
| 4\. Tampilkan riwayat perubahan             |                                                    |                       |
| ---                                         | ---                                                | ---                   | ---                  |
| 5\. Track modifikasi                        |                                                    |                       |
| ---                                         | ---                                                | ---                   | ---                  |
| **Interaksi & Navigasi**                    | 1\. Kuota Terpakai → detail transaksi              |                       |                      |
| ---                                         | ---                                                | ---                   | ---                  |
| 2\. Edit field yang diizinkan               |                                                    |                       |
| ---                                         | ---                                                | ---                   | ---                  |
| **Default Value & Data Source**             | 1\. Data promo existing                            |                       |                      |
| ---                                         | ---                                                | ---                   | ---                  |
| 2\. Log riwayat perubahan                   |                                                    |                       |
| ---                                         | ---                                                | ---                   | ---                  |
| **Validasi Field**                          | 1\. Sama dengan create                             |                       |                      |
| ---                                         | ---                                                | ---                   | ---                  |
| 2\. Aturan edit tambahan                    |                                                    |                       |
| ---                                         | ---                                                | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**        | Simpan → konfirmasi                                |                       |                      |
| ---                                         | ---                                                | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                 | Link ke riwayat transaksi                          |                       |                      |
| ---                                         | ---                                                | ---                   | ---                  |
| **Case Preventif**                          | Status "Akan Datang" membolehkan edit lebih banyak |                       |                      |
| ---                                         | ---                                                | ---                   | ---                  |

## **Ubah Promo Subscription - Form Ubah Promo Trial - Akan Datang LW-SPS-45**

| **Kategori**                          | **Rules**                       | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------- | ------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**              | 1\. Form edit untuk promo Trial |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| 2\. Field khusus Trial ditampilkan    |                                 |                       |
| ---                                   | ---                             | ---                   | ---                  |
| 3\. Tabel riwayat perubahan           |                                 |                       |
| ---                                   | ---                             | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif** | 1\. Field form Trial            |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| 2\. Beberapa field disabled           |                                 |                       |
| ---                                   | ---                             | ---                   | ---                  |
| 3\. Link Kuota Terpakai               |                                 |                       |
| ---                                   | ---                             | ---                   | ---                  |
| **UX Rules**                          | 1\. Pembatasan edit Trial       |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| 2\. Data Trial pre-filled             |                                 |                       |
| ---                                   | ---                             | ---                   | ---                  |
| 3\. Riwayat perubahan Trial spesifik  |                                 |                       |
| ---                                   | ---                             | ---                   | ---                  |
| **Interaksi & Navigasi**              | Sama dengan edit Paket          |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| **Default Value & Data Source**       | Data Trial existing             |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| **Validasi Field**                    | Validasi edit Trial             |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**  | Sama dengan **LW-SPS-44**       |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| **Keterkaitan Antar Fitur**           | Flow modifikasi Trial           |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| **Case Preventif**                    | Pembatasan khusus Trial         |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |

## **Ubah Promo Subscription - Form Ubah Promo Paket - Berjalan LW-SPS-46**

| **Kategori**                          | **Rules**                                    | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------- | -------------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**              | 1\. Form edit dengan lebih banyak pembatasan |                       |                      |
| ---                                   | ---                                          | ---                   | ---                  |
| 2\. Mulai Berlaku disabled            |                                              |                       |
| ---                                   | ---                                          | ---                   | ---                  |
| 3\. Paket disabled                    |                                              |                       |
| ---                                   | ---                                          | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif** | 1\. Field editable terbatas                  |                       |                      |
| ---                                   | ---                                          | ---                   | ---                  |
| 2\. Lebih banyak field disabled       |                                              |                       |
| ---                                   | ---                                          | ---                   | ---                  |
| **UX Rules**                          | 1\. Pembatasan promo berjalan                |                       |                      |
| ---                                   | ---                                          | ---                   | ---                  |
| 2\. Tidak bisa ubah tanggal mulai     |                                              |                       |
| ---                                   | ---                                          | ---                   | ---                  |
| 3\. Tidak bisa ubah paket             |                                              |                       |
| ---                                   | ---                                          | ---                   | ---                  |
| 4\. Warning dampak real-time          |                                              |                       |
| ---                                   | ---                                          | ---                   | ---                  |
| **Interaksi & Navigasi**              | Edit field terbatas                          |                       |                      |
| ---                                   | ---                                          | ---                   | ---                  |
| **Default Value & Data Source**       | Data promo aktif                             |                       |                      |
| ---                                   | ---                                          | ---                   | ---                  |
| **Validasi Field**                    | Validasi terbatas                            |                       |                      |
| ---                                   | ---                                          | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**  | Sama dengan **LW-SPS-44**                    |                       |                      |
| ---                                   | ---                                          | ---                   | ---                  |
| **Keterkaitan Antar Fitur**           | Batasan promo aktif                          |                       |                      |
| ---                                   | ---                                          | ---                   | ---                  |
| **Case Preventif**                    | Tidak boleh pengaruhi transaksi berjalan     |                       |                      |
| ---                                   | ---                                          | ---                   | ---                  |

## **Ubah Promo Subscription - Form Ubah Promo Trial - Berjalan LW-SPS-47**

| **Kategori**                          | **Rules**                             | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------- | ------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**              | 1\. Edit Trial dengan status berjalan |                       |                      |
| ---                                   | ---                                   | ---                   | ---                  |
| 2\. Lebih banyak field disabled       |                                       |                       |
| ---                                   | ---                                   | ---                   | ---                  |
| 3\. Wajib Beli disabled               |                                       |                       |
| ---                                   | ---                                   | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif** | 1\. Field editable sangat terbatas    |                       |                      |
| ---                                   | ---                                   | ---                   | ---                  |
| 2\. Mayoritas field read-only         |                                       |                       |
| ---                                   | ---                                   | ---                   | ---                  |
| **UX Rules**                          | 1\. Pembatasan Trial berjalan         |                       |                      |
| ---                                   | ---                                   | ---                   | ---                  |
| 2\. Field kritis dikunci              |                                       |                       |
| ---                                   | ---                                   | ---                   | ---                  |
| 3\. Tidak bisa ubah Wajib Beli Paket  |                                       |                       |
| ---                                   | ---                                   | ---                   | ---                  |
| **Interaksi & Navigasi**              | Edit minimal diizinkan                |                       |                      |
| ---                                   | ---                                   | ---                   | ---                  |
| **Default Value & Data Source**       | Data Trial aktif                      |                       |                      |
| ---                                   | ---                                   | ---                   | ---                  |
| **Validasi Field**                    | Sangat terbatas                       |                       |                      |
| ---                                   | ---                                   | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**  | Sama dengan **LW-SPS-44**             |                       |                      |
| ---                                   | ---                                   | ---                   | ---                  |
| **Keterkaitan Antar Fitur**           | Batasan Trial aktif                   |                       |                      |
| ---                                   | ---                                   | ---                   | ---                  |
| **Case Preventif**                    | Proteksi user aktif                   |                       |                      |
| ---                                   | ---                                   | ---                   | ---                  |

## **Ubah Promo Subscription - Pop up Konfirmasi Simpan LW-SPS-48**

| **Kategori**                          | **Rules**                       | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------- | ------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**              | 1\. Modal konfirmasi untuk edit |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| 2\. UI sama dengan konfirmasi create  |                                 |                       |
| ---                                   | ---                             | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif** | 1\. Button Batal                |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| 2\. Button Simpan                     |                                 |                       |
| ---                                   | ---                             | ---                   | ---                  |
| 3\. Button X tutup                    |                                 |                       |
| ---                                   | ---                             | ---                   | ---                  |
| **UX Rules**                          | 1\. Konfirmasi sebelum update   |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| 2\. Tampilkan warning dampak          |                                 |                       |
| ---                                   | ---                             | ---                   | ---                  |
| **Interaksi & Navigasi**              | 1\. Batal → cancel edit         |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| 2\. Simpan → proses update            |                                 |                       |
| ---                                   | ---                             | ---                   | ---                  |
| **Default Value & Data Source**       | TIDAK ADA                       |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| **Validasi Field**                    | TIDAK ADA                       |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**  | Simpan → popup sukses           |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| **Keterkaitan Antar Fitur**           | Trigger proses update           |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| **Case Preventif**                    | TIDAK ADA DATA                  |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |

## **Ubah Promo Subscription - Berhasil Simpan LW-SPS-49**

| **Kategori**                          | **Rules**                       | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------- | ------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**              | 1\. Popup sukses                |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| 2\. Pesan konfirmasi update           |                                 |                       |
| ---                                   | ---                             | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif** | Button OK                       |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| **UX Rules**                          | 1\. Animasi sukses              |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| 2\. Feedback update                   |                                 |                       |
| ---                                   | ---                             | ---                   | ---                  |
| **Interaksi & Navigasi**              | OK → halaman utama              |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| **Default Value & Data Source**       | TIDAK ADA                       |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| **Validasi Field**                    | TIDAK ADA                       |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**  | OK → Setting Promo Subscription |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| **Keterkaitan Antar Fitur**           | Update data promo               |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |
| **Case Preventif**                    | Flow approval jika diperlukan   |                       |                      |
| ---                                   | ---                             | ---                   | ---                  |

## **Ubah Promo Subscription - Kuota < Kuota Terpakai LW-SPS-50**

| **Kategori**                                         | **Rules**                               | **HW Frontend (jam)** | **HW Backend (jam)** |
| ---------------------------------------------------- | --------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                             | 1\. Popup warning                       |                       |                      |
| ---                                                  | ---                                     | ---                   | ---                  |
| 2\. Pesan "Kuota minimal sama dengan kuota terpakai" |                                         |                       |
| ---                                                  | ---                                     | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**                | Button X untuk tutup                    |                       |                      |
| ---                                                  | ---                                     | ---                   | ---                  |
| **UX Rules**                                         | 1\. Cegah pengurangan di bawah terpakai |                       |                      |
| ---                                                  | ---                                     | ---                   | ---                  |
| 2\. Kuota tidak boleh < Kuota terpakai               |                                         |                       |
| ---                                                  | ---                                     | ---                   | ---                  |
| 3\. Tampilkan penggunaan saat ini                    |                                         |                       |
| ---                                                  | ---                                     | ---                   | ---                  |
| **Interaksi & Navigasi**                             | X → tutup popup                         |                       |                      |
| ---                                                  | ---                                     | ---                   | ---                  |
| **Default Value & Data Source**                      | TIDAK ADA                               |                       |                      |
| ---                                                  | ---                                     | ---                   | ---                  |
| **Validasi Field**                                   | Kuota ≥ Kuota terpakai                  |                       |                      |
| ---                                                  | ---                                     | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**                 | Tetap di form                           |                       |                      |
| ---                                                  | ---                                     | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                          | Validasi tracking penggunaan            |                       |                      |
| ---                                                  | ---                                     | ---                   | ---                  |
| **Case Preventif**                                   | Tidak bisa kurangi kuota aktif          |                       |                      |
| ---                                                  | ---                                     | ---                   | ---                  |

## **Detail Promo Subscription - Detail Promo Paket LW-SPS-51**

| **Kategori**                          | **Rules**                         | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------- | --------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**              | 1\. Form view read-only           |                       |                      |
| ---                                   | ---                               | ---                   | ---                  |
| 2\. Semua field disabled              |                                   |                       |
| ---                                   | ---                               | ---                   | ---                  |
| 3\. Tabel Riwayat Perubahan           |                                   |                       |
| ---                                   | ---                               | ---                   | ---                  |
| 4\. Tidak ada button Simpan           |                                   |                       |
| ---                                   | ---                               | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif** | 1\. Button back saja              |                       |                      |
| ---                                   | ---                               | ---                   | ---                  |
| 2\. Semua field disabled              |                                   |                       |
| ---                                   | ---                               | ---                   | ---                  |
| **UX Rules**                          | 1\. Mode view-only                |                       |                      |
| ---                                   | ---                               | ---                   | ---                  |
| 2\. Tampilan informasi lengkap        |                                   |                       |
| ---                                   | ---                               | ---                   | ---                  |
| 3\. Tidak ada editing                 |                                   |                       |
| ---                                   | ---                               | ---                   | ---                  |
| **Interaksi & Navigasi**              | Back → halaman utama              |                       |                      |
| ---                                   | ---                               | ---                   | ---                  |
| **Default Value & Data Source**       | Data promo terpilih               |                       |                      |
| ---                                   | ---                               | ---                   | ---                  |
| **Validasi Field**                    | TIDAK ADA                         |                       |                      |
| ---                                   | ---                               | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**  | Back → Setting Promo Subscription |                       |                      |
| ---                                   | ---                               | ---                   | ---                  |
| **Keterkaitan Antar Fitur**           | View dari berbagai menu           |                       |                      |
| ---                                   | ---                               | ---                   | ---                  |
| **Case Preventif**                    | TIDAK ADA DATA                    |                       |                      |
| ---                                   | ---                               | ---                   | ---                  |

## **Detail Promo Subscription - Detail Promo Trial LW-SPS-52**

| **Kategori**                          | **Rules**                         | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------- | --------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**              | 1\. Form Trial read-only          |                       |                      |
| ---                                   | ---                               | ---                   | ---                  |
| 2\. Field Trial ditampilkan           |                                   |                       |
| ---                                   | ---                               | ---                   | ---                  |
| 3\. Tabel riwayat perubahan           |                                   |                       |
| ---                                   | ---                               | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif** | 1\. Button back saja              |                       |                      |
| ---                                   | ---                               | ---                   | ---                  |
| 2\. Semua field disabled              |                                   |                       |
| ---                                   | ---                               | ---                   | ---                  |
| **UX Rules**                          | 1\. Mode view-only Trial          |                       |                      |
| ---                                   | ---                               | ---                   | ---                  |
| 2\. Info Trial lengkap                |                                   |                       |
| ---                                   | ---                               | ---                   | ---                  |
| 3\. Tidak ada editing                 |                                   |                       |
| ---                                   | ---                               | ---                   | ---                  |
| **Interaksi & Navigasi**              | Back → halaman utama              |                       |                      |
| ---                                   | ---                               | ---                   | ---                  |
| **Default Value & Data Source**       | Data Trial terpilih               |                       |                      |
| ---                                   | ---                               | ---                   | ---                  |
| **Validasi Field**                    | TIDAK ADA                         |                       |                      |
| ---                                   | ---                               | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**  | Back → Setting Promo Subscription |                       |                      |
| ---                                   | ---                               | ---                   | ---                  |
| **Keterkaitan Antar Fitur**           | View detail Trial                 |                       |                      |
| ---                                   | ---                               | ---                   | ---                  |
| **Case Preventif**                    | TIDAK ADA DATA                    |                       |                      |
| ---                                   | ---                               | ---                   | ---                  |

## **Setting Promo Subscription - Pengajuan - Tabel Pengajuan LW-SPS-53**

| **Kategori**                                     | **Rules**                         | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------------------ | --------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                         | 1\. Tab Pengajuan aktif           |                       |                      |
| ---                                              | ---                               | ---                   | ---                  |
| 2\. Tabel tanpa kolom Kuota Terpakai             |                                   |                       |
| ---                                              | ---                               | ---                   | ---                  |
| 3\. Data pending approval                        |                                   |                       |
| ---                                              | ---                               | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**            | 1\. Tab Pengajuan aktif           |                       |                      |
| ---                                              | ---                               | ---                   | ---                  |
| 2\. Button Detail per baris                      |                                   |                       |
| ---                                              | ---                               | ---                   | ---                  |
| 3\. Field search                                 |                                   |                       |
| ---                                              | ---                               | ---                   | ---                  |
| **UX Rules**                                     | 1\. Tampilkan pengajuan pending   |                       |                      |
| ---                                              | ---                               | ---                   | ---                  |
| 2\. Tidak ada edit untuk pending                 |                                   |                       |
| ---                                              | ---                               | ---                   | ---                  |
| 3\. Data semua user dengan status butuh approval |                                   |                       |
| ---                                              | ---                               | ---                   | ---                  |
| 4\. Auto-expire jika lewat tanggal               |                                   |                       |
| ---                                              | ---                               | ---                   | ---                  |
| **Interaksi & Navigasi**                         | Detail → detail pengajuan         |                       |                      |
| ---                                              | ---                               | ---                   | ---                  |
| **Default Value & Data Source**                  | 1\. Data pending approval         |                       |                      |
| ---                                              | ---                               | ---                   | ---                  |
| 2\. Submission semua user                        |                                   |                       |
| ---                                              | ---                               | ---                   | ---                  |
| **Validasi Field**                               | TIDAK ADA                         |                       |                      |
| ---                                              | ---                               | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**             | Detail → Halaman Detail Pengajuan |                       |                      |
| ---                                              | ---                               | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                      | Workflow approval                 |                       |                      |
| ---                                              | ---                               | ---                   | ---                  |
| **Case Preventif**                               | Mekanisme auto-expire             |                       |                      |
| ---                                              | ---                               | ---                   | ---                  |

## **Setting Promo Subscription - Pengajuan - Pencarian / Data Kosong LW-SPS-54**

| **Kategori**                           | **Rules**                  | **HW Frontend (jam)** | **HW Backend (jam)** |
| -------------------------------------- | -------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**               | 1\. Tabel pengajuan kosong |                       |                      |
| ---                                    | ---                        | ---                   | ---                  |
| 2\. Pesan "Tidak ada data dalam tabel" |                            |                       |
| ---                                    | ---                        | ---                   | ---                  |
| 3\. Field search tersedia              |                            |                       |
| ---                                    | ---                        | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**  | 1\. Field search           |                       |                      |
| ---                                    | ---                        | ---                   | ---                  |
| 2\. Tabel kosong                       |                            |                       |
| ---                                    | ---                        | ---                   | ---                  |
| **UX Rules**                           | 1\. Empty state jelas      |                       |                      |
| ---                                    | ---                        | ---                   | ---                  |
| 2\. Search tersedia                    |                            |                       |
| ---                                    | ---                        | ---                   | ---                  |
| **Interaksi & Navigasi**               | Search → filter tabel      |                       |                      |
| ---                                    | ---                        | ---                   | ---                  |
| **Default Value & Data Source**        | Tidak ada data pending     |                       |                      |
| ---                                    | ---                        | ---                   | ---                  |
| **Validasi Field**                     | TIDAK ADA                  |                       |                      |
| ---                                    | ---                        | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**   | TIDAK ADA                  |                       |                      |
| ---                                    | ---                        | ---                   | ---                  |
| **Keterkaitan Antar Fitur**            | Antrian approval kosong    |                       |                      |
| ---                                    | ---                        | ---                   | ---                  |
| **Case Preventif**                     | TIDAK ADA DATA             |                       |                      |
| ---                                    | ---                        | ---                   | ---                  |

## **Setting Promo Subscription - Pengajuan - Detail Pengajuan LW-SPS-55**

| **Kategori**                                  | **Rules**                                  | **HW Frontend (jam)** | **HW Backend (jam)** |
| --------------------------------------------- | ------------------------------------------ | --------------------- | -------------------- |
| **Komponen UI & Layout**                      | 1\. Form detail read-only                  |                       |                      |
| ---                                           | ---                                        | ---                   | ---                  |
| 2\. Button "Batalkan Pengajuan" (kondisional) |                                            |                       |
| ---                                           | ---                                        | ---                   | ---                  |
| 3\. Tidak ada field Kuota Terpakai            |                                            |                       |
| ---                                           | ---                                        | ---                   | ---                  |
| 4\. Riwayat dengan kolom Catatan              |                                            |                       |
| ---                                           | ---                                        | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**         | 1\. Button back                            |                       |                      |
| ---                                           | ---                                        | ---                   | ---                  |
| 2\. Batalkan Pengajuan (jika pemilik)         |                                            |                       |
| ---                                           | ---                                        | ---                   | ---                  |
| 3\. Semua field disabled                      |                                            |                       |
| ---                                           | ---                                        | ---                   | ---                  |
| **UX Rules**                                  | 1\. Button muncul jika user adalah pengaju |                       |                      |
| ---                                           | ---                                        | ---                   | ---                  |
| 2\. View detail read-only                     |                                            |                       |
| ---                                           | ---                                        | ---                   | ---                  |
| 3\. Kolom Catatan untuk reject history        |                                            |                       |
| ---                                           | ---                                        | ---                   | ---                  |
| **Interaksi & Navigasi**                      | 1\. Batalkan → konfirmasi                  |                       |                      |
| ---                                           | ---                                        | ---                   | ---                  |
| 2\. Back → list Pengajuan                     |                                            |                       |
| ---                                           | ---                                        | ---                   | ---                  |
| **Default Value & Data Source**               | Data promo pending                         |                       |                      |
| ---                                           | ---                                        | ---                   | ---                  |
| **Validasi Field**                            | TIDAK ADA                                  |                       |                      |
| ---                                           | ---                                        | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**          | Batalkan → popup konfirmasi                |                       |                      |
| ---                                           | ---                                        | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                   | Pemilik bisa batalkan                      |                       |                      |
| ---                                           | ---                                        | ---                   | ---                  |
| **Case Preventif**                            | Visibilitas button berdasar pemilik        |                       |                      |
| ---                                           | ---                                        | ---                   | ---                  |

## **Setting Promo Subscription - Pengajuan - Konfirmasi Batalkan Pengajuan LW-SPS-56**

| **Kategori**                                               | **Rules**                 | **HW Frontend (jam)** | **HW Backend (jam)** |
| ---------------------------------------------------------- | ------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                                   | 1\. Modal konfirmasi      |                       |                      |
| ---                                                        | ---                       | ---                   | ---                  |
| 2\. Pesan "Apakah Anda yakin ingin membatalkan pengajuan?" |                           |                       |
| ---                                                        | ---                       | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**                      | 1\. Button Tidak          |                       |                      |
| ---                                                        | ---                       | ---                   | ---                  |
| 2\. Button Ya                                              |                           |                       |
| ---                                                        | ---                       | ---                   | ---                  |
| 3\. Button X tutup                                         |                           |                       |
| ---                                                        | ---                       | ---                   | ---                  |
| **UX Rules**                                               | 1\. Konfirmasi pembatalan |                       |                      |
| ---                                                        | ---                       | ---                   | ---                  |
| 2\. Cegah pembatalan tidak sengaja                         |                           |                       |
| ---                                                        | ---                       | ---                   | ---                  |
| **Interaksi & Navigasi**                                   | 1\. Tidak/X → tutup modal |                       |                      |
| ---                                                        | ---                       | ---                   | ---                  |
| 2\. Ya → proses batal                                      |                           |                       |
| ---                                                        | ---                       | ---                   | ---                  |
| **Default Value & Data Source**                            | TIDAK ADA                 |                       |                      |
| ---                                                        | ---                       | ---                   | ---                  |
| **Validasi Field**                                         | TIDAK ADA                 |                       |                      |
| ---                                                        | ---                       | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**                       | Ya → pesan sukses         |                       |                      |
| ---                                                        | ---                       | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                                | Batalkan submission       |                       |                      |
| ---                                                        | ---                       | ---                   | ---                  |
| **Case Preventif**                                         | TIDAK ADA DATA            |                       |                      |
| ---                                                        | ---                       | ---                   | ---                  |

## **Setting Promo Subscription - Pengajuan - Berhasil Batalkan Pengajuan LW-SPS-57**

| **Kategori**                                 | **Rules**                 | **HW Frontend (jam)** | **HW Backend (jam)** |
| -------------------------------------------- | ------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                     | 1\. Popup sukses          |                       |                      |
| ---                                          | ---                       | ---                   | ---                  |
| 2\. Pesan "Pengajuan berhasil dibatalkan"    |                           |                       |
| ---                                          | ---                       | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**        | Button X untuk tutup      |                       |                      |
| ---                                          | ---                       | ---                   | ---                  |
| **UX Rules**                                 | 1\. Feedback pembatalan   |                       |                      |
| ---                                          | ---                       | ---                   | ---                  |
| 2\. Opsi auto-close                          |                           |                       |
| ---                                          | ---                       | ---                   | ---                  |
| 3\. Data pindah ke Riwayat status "Canceled" |                           |                       |
| ---                                          | ---                       | ---                   | ---                  |
| 4\. Update status ke "Canceled"              |                           |                       |
| ---                                          | ---                       | ---                   | ---                  |
| **Interaksi & Navigasi**                     | X → kembali ke list       |                       |                      |
| ---                                          | ---                       | ---                   | ---                  |
| **Default Value & Data Source**              | TIDAK ADA                 |                       |                      |
| ---                                          | ---                       | ---                   | ---                  |
| **Validasi Field**                           | TIDAK ADA                 |                       |                      |
| ---                                          | ---                       | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**         | X → List Pengajuan        |                       |                      |
| ---                                          | ---                       | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                  | Pindah ke Riwayat         |                       |                      |
| ---                                          | ---                       | ---                   | ---                  |
| **Case Preventif**                           | Status menjadi "Canceled" |                       |                      |
| ---                                          | ---                       | ---                   | ---                  |

## **Setting Promo Subscription - Pengajuan - Detail Pengajuan User Lain LW-SPS-58**

| **Kategori**                          | **Rules**                                | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------- | ---------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**              | 1\. Form detail tanpa button Batalkan    |                       |                      |
| ---                                   | ---                                      | ---                   | ---                  |
| 2\. View read-only                    |                                          |                       |
| ---                                   | ---                                      | ---                   | ---                  |
| 3\. Bukan pemilik yang melihat        |                                          |                       |
| ---                                   | ---                                      | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif** | 1\. Button back saja                     |                       |                      |
| ---                                   | ---                                      | ---                   | ---                  |
| 2\. Tidak ada button Batalkan         |                                          |                       |
| ---                                   | ---                                      | ---                   | ---                  |
| **UX Rules**                          | 1\. Sembunyikan cancel untuk non-pemilik |                       |                      |
| ---                                   | ---                                      | ---                   | ---                  |
| 2\. Akses view-only                   |                                          |                       |
| ---                                   | ---                                      | ---                   | ---                  |
| 3\. Hanya bisa lihat data             |                                          |                       |
| ---                                   | ---                                      | ---                   | ---                  |
| **Interaksi & Navigasi**              | Back → list Pengajuan                    |                       |                      |
| ---                                   | ---                                      | ---                   | ---                  |
| **Default Value & Data Source**       | Submission user lain                     |                       |                      |
| ---                                   | ---                                      | ---                   | ---                  |
| **Validasi Field**                    | TIDAK ADA                                |                       |                      |
| ---                                   | ---                                      | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**  | Back → list Pengajuan                    |                       |                      |
| ---                                   | ---                                      | ---                   | ---                  |
| **Keterkaitan Antar Fitur**           | Permission view                          |                       |                      |
| ---                                   | ---                                      | ---                   | ---                  |
| **Case Preventif**                    | Tidak bisa batalkan milik orang lain     |                       |                      |
| ---                                   | ---                                      | ---                   | ---                  |

## **Setting Promo Subscription - Riwayat - Tabel Riwayat LW-SPS-59**

| **Kategori**                                   | **Rules**                  | **HW Frontend (jam)** | **HW Backend (jam)** |
| ---------------------------------------------- | -------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                       | 1\. Tab Riwayat aktif      |                       |                      |
| ---                                            | ---                        | ---                   | ---                  |
| 2\. Tabel dengan kolom Approval                |                            |                       |
| ---                                            | ---                        | ---                   | ---                  |
| 3\. Tampilan data historis                     |                            |                       |
| ---                                            | ---                        | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**          | 1\. Tab Riwayat aktif      |                       |                      |
| ---                                            | ---                        | ---                   | ---                  |
| 2\. Button Detail per baris                    |                            |                       |
| ---                                            | ---                        | ---                   | ---                  |
| 3\. Status approval ditampilkan                |                            |                       |
| ---                                            | ---                        | ---                   | ---                  |
| **UX Rules**                                   | 1\. Tampilkan item selesai |                       |                      |
| ---                                            | ---                        | ---                   | ---                  |
| 2\. Status: Approved/Rejected/Expired/Canceled |                            |                       |
| ---                                            | ---                        | ---                   | ---                  |
| 3\. Data final tidak butuh approval            |                            |                       |
| ---                                            | ---                        | ---                   | ---                  |
| 4\. Status dengan kode warna                   |                            |                       |
| ---                                            | ---                        | ---                   | ---                  |
| **Interaksi & Navigasi**                       | Detail → detail riwayat    |                       |                      |
| ---                                            | ---                        | ---                   | ---                  |
| **Default Value & Data Source**                | 1\. Data promo historis    |                       |                      |
| ---                                            | ---                        | ---                   | ---                  |
| 2\. Semua status final                         |                            |                       |
| ---                                            | ---                        | ---                   | ---                  |
| **Validasi Field**                             | TIDAK ADA                  |                       |                      |
| ---                                            | ---                        | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**           | Detail → Detail Riwayat    |                       |                      |
| ---                                            | ---                        | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                    | Arsip semua promo          |                       |                      |
| ---                                            | ---                        | ---                   | ---                  |
| **Case Preventif**                             | TIDAK ADA DATA             |                       |                      |
| ---                                            | ---                        | ---                   | ---                  |

## **Setting Promo Subscription - Riwayat - Pencarian / Data Kosong LW-SPS-60**

| **Kategori**                          | **Rules**                | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------- | ------------------------ | --------------------- | -------------------- |
| **Komponen UI & Layout**              | 1\. Tabel riwayat kosong |                       |                      |
| ---                                   | ---                      | ---                   | ---                  |
| 2\. Field search tersedia             |                          |                       |
| ---                                   | ---                      | ---                   | ---                  |
| 3\. Pesan empty state                 |                          |                       |
| ---                                   | ---                      | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif** | 1\. Field search         |                       |                      |
| ---                                   | ---                      | ---                   | ---                  |
| 2\. Tabel kosong                      |                          |                       |
| ---                                   | ---                      | ---                   | ---                  |
| **UX Rules**                          | 1\. Empty state jelas    |                       |                      |
| ---                                   | ---                      | ---                   | ---                  |
| 2\. Fungsi search aktif               |                          |                       |
| ---                                   | ---                      | ---                   | ---                  |
| 3\. Tampilkan pesan informatif        |                          |                       |
| ---                                   | ---                      | ---                   | ---                  |
| **Interaksi & Navigasi**              | Search → filter riwayat  |                       |                      |
| ---                                   | ---                      | ---                   | ---                  |
| **Default Value & Data Source**       | Tidak ada data historis  |                       |                      |
| ---                                   | ---                      | ---                   | ---                  |
| **Validasi Field**                    | TIDAK ADA                |                       |                      |
| ---                                   | ---                      | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**  | TIDAK ADA                |                       |                      |
| ---                                   | ---                      | ---                   | ---                  |
| **Keterkaitan Antar Fitur**           | Arsip kosong             |                       |                      |
| ---                                   | ---                      | ---                   | ---                  |
| **Case Preventif**                    | TIDAK ADA DATA           |                       |                      |
| ---                                   | ---                      | ---                   | ---                  |

## **Setting Promo Subscription - Riwayat - Detail - Approved LW-SPS-61**

| **Kategori**                                 | **Rules**                         | **HW Frontend (jam)** | **HW Backend (jam)** |
| -------------------------------------------- | --------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                     | 1\. Detail dengan status Approved |                       |                      |
| ---                                          | ---                               | ---                   | ---                  |
| 2\. Field Pengajuan menampilkan pengaju      |                                   |                       |
| ---                                          | ---                               | ---                   | ---                  |
| 3\. Field Approval menampilkan approver      |                                   |                       |
| ---                                          | ---                               | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**        | 1\. Button back saja              |                       |                      |
| ---                                          | ---                               | ---                   | ---                  |
| 2\. Semua field disabled                     |                                   |                       |
| ---                                          | ---                               | ---                   | ---                  |
| **UX Rules**                                 | 1\. Tampilkan jejak approval      |                       |                      |
| ---                                          | ---                               | ---                   | ---                  |
| 2\. Info audit lengkap                       |                                   |                       |
| ---                                          | ---                               | ---                   | ---                  |
| 3\. Format: "DD/MM/YY HH:MM - Nama - Status" |                                   |                       |
| ---                                          | ---                               | ---                   | ---                  |
| 4\. Tampilan timestamp                       |                                   |                       |
| ---                                          | ---                               | ---                   | ---                  |
| **Interaksi & Navigasi**                     | Back → list Riwayat               |                       |                      |
| ---                                          | ---                               | ---                   | ---                  |
| **Default Value & Data Source**              | 1\. Data promo approved           |                       |                      |
| ---                                          | ---                               | ---                   | ---                  |
| 2\. Metadata approval                        |                                   |                       |
| ---                                          | ---                               | ---                   | ---                  |
| **Validasi Field**                           | TIDAK ADA                         |                       |                      |
| ---                                          | ---                               | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**         | Back → list Riwayat               |                       |                      |
| ---                                          | ---                               | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                  | Audit trail approval              |                       |                      |
| ---                                          | ---                               | ---                   | ---                  |
| **Case Preventif**                           | TIDAK ADA DATA                    |                       |                      |
| ---                                          | ---                               | ---                   | ---                  |

## **Setting Promo Subscription - Riwayat - Detail - Expired LW-SPS-62**

| **Kategori**                          | **Rules**                        | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------- | -------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**              | 1\. Detail dengan status Expired |                       |                      |
| ---                                   | ---                              | ---                   | ---                  |
| 2\. Menampilkan informasi expiry      |                                  |                       |
| ---                                   | ---                              | ---                   | ---                  |
| 3\. View read-only                    |                                  |                       |
| ---                                   | ---                              | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif** | 1\. Button back saja             |                       |                      |
| ---                                   | ---                              | ---                   | ---                  |
| 2\. Semua field disabled              |                                  |                       |
| ---                                   | ---                              | ---                   | ---                  |
| **UX Rules**                          | 1\. Tampilkan status expired     |                       |                      |
| ---                                   | ---                              | ---                   | ---                  |
| 2\. Tampilkan alasan expiry           |                                  |                       |
| ---                                   | ---                              | ---                   | ---                  |
| 3\. Format sama dengan Approved       |                                  |                       |
| ---                                   | ---                              | ---                   | ---                  |
| **Interaksi & Navigasi**              | Back → list Riwayat              |                       |                      |
| ---                                   | ---                              | ---                   | ---                  |
| **Default Value & Data Source**       | Data promo expired               |                       |                      |
| ---                                   | ---                              | ---                   | ---                  |
| **Validasi Field**                    | TIDAK ADA                        |                       |                      |
| ---                                   | ---                              | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**  | Back → list Riwayat              |                       |                      |
| ---                                   | ---                              | ---                   | ---                  |
| **Keterkaitan Antar Fitur**           | Sistem auto-expiry               |                       |                      |
| ---                                   | ---                              | ---                   | ---                  |
| **Case Preventif**                    | Item auto-expired                |                       |                      |
| ---                                   | ---                              | ---                   | ---                  |

## **Setting Promo Subscription - Riwayat - Detail - Rejected LW-SPS-63**

| **Kategori**                              | **Rules**                         | **HW Frontend (jam)** | **HW Backend (jam)** |
| ----------------------------------------- | --------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                  | 1\. Detail dengan status Rejected |                       |                      |
| ---                                       | ---                               | ---                   | ---                  |
| 2\. Field Catatan Penolakan ditampilkan   |                                   |                       |
| ---                                       | ---                               | ---                   | ---                  |
| 3\. Alasan penolakan terlihat             |                                   |                       |
| ---                                       | ---                               | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**     | 1\. Button back saja              |                       |                      |
| ---                                       | ---                               | ---                   | ---                  |
| 2\. Catatan Penolakan terlihat            |                                   |                       |
| ---                                       | ---                               | ---                   | ---                  |
| **UX Rules**                              | 1\. Tampilkan detail penolakan    |                       |                      |
| ---                                       | ---                               | ---                   | ---                  |
| 2\. Tampilkan alasan reject               |                                   |                       |
| ---                                       | ---                               | ---                   | ---                  |
| 3\. Field Catatan Penolakan berisi alasan |                                   |                       |
| ---                                       | ---                               | ---                   | ---                  |
| 4\. Informasi penolak                     |                                   |                       |
| ---                                       | ---                               | ---                   | ---                  |
| **Interaksi & Navigasi**                  | Back → list Riwayat               |                       |                      |
| ---                                       | ---                               | ---                   | ---                  |
| **Default Value & Data Source**           | 1\. Data promo rejected           |                       |                      |
| ---                                       | ---                               | ---                   | ---                  |
| 2\. Catatan penolakan                     |                                   |                       |
| ---                                       | ---                               | ---                   | ---                  |
| **Validasi Field**                        | TIDAK ADA                         |                       |                      |
| ---                                       | ---                               | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**      | Back → list Riwayat               |                       |                      |
| ---                                       | ---                               | ---                   | ---                  |
| **Keterkaitan Antar Fitur**               | Feedback penolakan                |                       |                      |
| ---                                       | ---                               | ---                   | ---                  |
| **Case Preventif**                        | TIDAK ADA DATA                    |                       |                      |
| ---                                       | ---                               | ---                   | ---                  |

## **Setting Promo Subscription - Butuh Approval - Tabel Butuh Approval LW-SPS-64**

| **Kategori**                          | **Rules**                               | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------- | --------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**              | 1\. Tab Butuh Approval (untuk approver) |                       |                      |
| ---                                   | ---                                     | ---                   | ---                  |
| 2\. Tabel pending approval            |                                         |                       |
| ---                                   | ---                                     | ---                   | ---                  |
| 3\. Counter badge menampilkan jumlah  |                                         |                       |
| ---                                   | ---                                     | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif** | 1\. Tab Butuh Approval aktif            |                       |                      |
| ---                                   | ---                                     | ---                   | ---                  |
| 2\. Button Detail per baris           |                                         |                       |
| ---                                   | ---                                     | ---                   | ---                  |
| 3\. Counter badge (3)                 |                                         |                       |
| ---                                   | ---                                     | ---                   | ---                  |
| **UX Rules**                          | 1\. Hanya untuk user approval           |                       |                      |
| ---                                   | ---                                     | ---                   | ---                  |
| 2\. Tampilkan item butuh approval     |                                         |                       |
| ---                                   | ---                                     | ---                   | ---                  |
| 3\. Counter merah dengan jumlah       |                                         |                       |
| ---                                   | ---                                     | ---                   | ---                  |
| 4\. Data dari semua user              |                                         |                       |
| ---                                   | ---                                     | ---                   | ---                  |
| 5\. Sorting prioritas                 |                                         |                       |
| ---                                   | ---                                     | ---                   | ---                  |
| **Interaksi & Navigasi**              | Detail → form approval                  |                       |                      |
| ---                                   | ---                                     | ---                   | ---                  |
| **Default Value & Data Source**       | 1\. Antrian pending approval            |                       |                      |
| ---                                   | ---                                     | ---                   | ---                  |
| 2\. Submission semua user             |                                         |                       |
| ---                                   | ---                                     | ---                   | ---                  |
| **Validasi Field**                    | TIDAK ADA                               |                       |                      |
| ---                                   | ---                                     | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**  | Detail → Detail untuk approval          |                       |                      |
| ---                                   | ---                                     | ---                   | ---                  |
| **Keterkaitan Antar Fitur**           | Workflow approval                       |                       |                      |
| ---                                   | ---                                     | ---                   | ---                  |
| **Case Preventif**                    | Visibilitas berdasar role               |                       |                      |
| ---                                   | ---                                     | ---                   | ---                  |

## **Setting Promo Subscription - Butuh Approval - Pencarian / Data Kosong LW-SPS-65**

| **Kategori**                          | **Rules**                   | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------- | --------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**              | 1\. Tabel approval kosong   |                       |                      |
| ---                                   | ---                         | ---                   | ---                  |
| 2\. Tidak ada item pending            |                             |                       |
| ---                                   | ---                         | ---                   | ---                  |
| 3\. Search tersedia                   |                             |                       |
| ---                                   | ---                         | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif** | 1\. Field search            |                       |                      |
| ---                                   | ---                         | ---                   | ---                  |
| 2\. Tabel kosong                      |                             |                       |
| ---                                   | ---                         | ---                   | ---                  |
| **UX Rules**                          | 1\. Antrian approval kosong |                       |                      |
| ---                                   | ---                         | ---                   | ---                  |
| 2\. Fungsi search aktif               |                             |                       |
| ---                                   | ---                         | ---                   | ---                  |
| 3\. Pesan informatif                  |                             |                       |
| ---                                   | ---                         | ---                   | ---                  |
| **Interaksi & Navigasi**              | Search → filter antrian     |                       |                      |
| ---                                   | ---                         | ---                   | ---                  |
| **Default Value & Data Source**       | Tidak ada pending approval  |                       |                      |
| ---                                   | ---                         | ---                   | ---                  |
| **Validasi Field**                    | TIDAK ADA                   |                       |                      |
| ---                                   | ---                         | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**  | TIDAK ADA                   |                       |                      |
| ---                                   | ---                         | ---                   | ---                  |
| **Keterkaitan Antar Fitur**           | State antrian kosong        |                       |                      |
| ---                                   | ---                         | ---                   | ---                  |
| **Case Preventif**                    | TIDAK ADA DATA              |                       |                      |
| ---                                   | ---                         | ---                   | ---                  |

## **Setting Promo Subscription - Butuh Approval - Detail - Approve LW-SPS-66**

| **Kategori**                            | **Rules**                                 | **HW Frontend (jam)** | **HW Backend (jam)** |
| --------------------------------------- | ----------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                | 1\. Form approval dengan radio button     |                       |                      |
| ---                                     | ---                                       | ---                   | ---                  |
| 2\. Approve terpilih default            |                                           |                       |
| ---                                     | ---                                       | ---                   | ---                  |
| 3\. Field Catatan disabled              |                                           |                       |
| ---                                     | ---                                       | ---                   | ---                  |
| 4\. Button Simpan aktif                 |                                           |                       |
| ---                                     | ---                                       | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**   | 1\. Radio Approve (terpilih)              |                       |                      |
| ---                                     | ---                                       | ---                   | ---                  |
| 2\. Radio Reject                        |                                           |                       |
| ---                                     | ---                                       | ---                   | ---                  |
| 3\. Field Catatan (disabled)            |                                           |                       |
| ---                                     | ---                                       | ---                   | ---                  |
| 4\. Button Simpan                       |                                           |                       |
| ---                                     | ---                                       | ---                   | ---                  |
| **UX Rules**                            | 1\. Approve default selection             |                       |                      |
| ---                                     | ---                                       | ---                   | ---                  |
| 2\. Catatan disabled untuk approve      |                                           |                       |
| ---                                     | ---                                       | ---                   | ---                  |
| 3\. Field Pengajuan menampilkan pengaju |                                           |                       |
| ---                                     | ---                                       | ---                   | ---                  |
| **Interaksi & Navigasi**                | 1\. Toggle radio → enable/disable Catatan |                       |                      |
| ---                                     | ---                                       | ---                   | ---                  |
| 2\. Simpan → konfirmasi                 |                                           |                       |
| ---                                     | ---                                       | ---                   | ---                  |
| **Default Value & Data Source**         | 1\. Data promo pending                    |                       |                      |
| ---                                     | ---                                       | ---                   | ---                  |
| 2\. Radio default: Approve              |                                           |                       |
| ---                                     | ---                                       | ---                   | ---                  |
| **Validasi Field**                      | Tidak ada validasi untuk approve          |                       |                      |
| ---                                     | ---                                       | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**    | Simpan → popup konfirmasi                 |                       |                      |
| ---                                     | ---                                       | ---                   | ---                  |
| **Keterkaitan Antar Fitur**             | Keputusan approval                        |                       |                      |
| ---                                     | ---                                       | ---                   | ---                  |
| **Case Preventif**                      | TIDAK ADA DATA                            |                       |                      |
| ---                                     | ---                                       | ---                   | ---                  |

## **Setting Promo Subscription - Butuh Approval - Detail - Reject LW-SPS-67**

| **Kategori**                          | **Rules**                      | **HW Frontend (jam)** | **HW Backend (jam)** |
| ------------------------------------- | ------------------------------ | --------------------- | -------------------- |
| **Komponen UI & Layout**              | 1\. Radio Reject terpilih      |                       |                      |
| ---                                   | ---                            | ---                   | ---                  |
| 2\. Field Catatan enabled             |                                |                       |
| ---                                   | ---                            | ---                   | ---                  |
| 3\. Wajib untuk penolakan             |                                |                       |
| ---                                   | ---                            | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif** | 1\. Radio Reject (terpilih)    |                       |                      |
| ---                                   | ---                            | ---                   | ---                  |
| 2\. Field Catatan (enabled)           |                                |                       |
| ---                                   | ---                            | ---                   | ---                  |
| 3\. Button Simpan                     |                                |                       |
| ---                                   | ---                            | ---                   | ---                  |
| **UX Rules**                          | 1\. Catatan wajib untuk reject |                       |                      |
| ---                                   | ---                            | ---                   | ---                  |
| 2\. Field enable saat reject          |                                |                       |
| ---                                   | ---                            | ---                   | ---                  |
| 3\. Harus isi alasan penolakan        |                                |                       |
| ---                                   | ---                            | ---                   | ---                  |
| **Interaksi & Navigasi**              | Harus isi Catatan              |                       |                      |
| ---                                   | ---                            | ---                   | ---                  |
| **Default Value & Data Source**       | Catatan kosong                 |                       |                      |
| ---                                   | ---                            | ---                   | ---                  |
| **Validasi Field**                    | Catatan mandatory untuk reject |                       |                      |
| ---                                   | ---                            | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**  | Sama dengan **LW-SPS-66**      |                       |                      |
| ---                                   | ---                            | ---                   | ---                  |
| **Keterkaitan Antar Fitur**           | Proses penolakan               |                       |                      |
| ---                                   | ---                            | ---                   | ---                  |
| **Case Preventif**                    | TIDAK ADA DATA                 |                       |                      |
| ---                                   | ---                            | ---                   | ---                  |

## **Setting Promo Subscription - Butuh Approval - Catatan Kosong LW-SPS-68**

| **Kategori**                                             | **Rules**                  | **HW Frontend (jam)** | **HW Backend (jam)** |
| -------------------------------------------------------- | -------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                                 | 1\. Popup warning          |                       |                      |
| ---                                                      | ---                        | ---                   | ---                  |
| 2\. Pesan "Catatan wajib diisi ketika menolak pengajuan" |                            |                       |
| ---                                                      | ---                        | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**                    | Button X untuk tutup       |                       |                      |
| ---                                                      | ---                        | ---                   | ---                  |
| **UX Rules**                                             | 1\. Paksa alasan penolakan |                       |                      |
| ---                                                      | ---                        | ---                   | ---                  |
| 2\. Focus Catatan setelah tutup                          |                            |                       |
| ---                                                      | ---                        | ---                   | ---                  |
| **Interaksi & Navigasi**                                 | X → tutup, focus Catatan   |                       |                      |
| ---                                                      | ---                        | ---                   | ---                  |
| **Default Value & Data Source**                          | TIDAK ADA                  |                       |                      |
| ---                                                      | ---                        | ---                   | ---                  |
| **Validasi Field**                                       | Cek Catatan wajib          |                       |                      |
| ---                                                      | ---                        | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**                     | Tetap di form              |                       |                      |
| ---                                                      | ---                        | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                              | Validasi penolakan         |                       |                      |
| ---                                                      | ---                        | ---                   | ---                  |
| **Case Preventif**                                       | TIDAK ADA DATA             |                       |                      |
| ---                                                      | ---                        | ---                   | ---                  |

## **Setting Promo Subscription - Butuh Approval - Detail - Konfirmasi Simpan LW-SPS-69**

| **Kategori**                                       | **Rules**                         | **HW Frontend (jam)** | **HW Backend (jam)** |
| -------------------------------------------------- | --------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                           | 1\. Modal konfirmasi              |                       |                      |
| ---                                                | ---                               | ---                   | ---                  |
| 2\. Pesan "Apakah anda yakin akan menyimpan data?" |                                   |                       |
| ---                                                | ---                               | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**              | 1\. Button Batal                  |                       |                      |
| ---                                                | ---                               | ---                   | ---                  |
| 2\. Button Simpan                                  |                                   |                       |
| ---                                                | ---                               | ---                   | ---                  |
| 3\. Button X tutup                                 |                                   |                       |
| ---                                                | ---                               | ---                   | ---                  |
| **UX Rules**                                       | 1\. Konfirmasi keputusan approval |                       |                      |
| ---                                                | ---                               | ---                   | ---                  |
| 2\. Cek final sebelum simpan                       |                                   |                       |
| ---                                                | ---                               | ---                   | ---                  |
| **Interaksi & Navigasi**                           | 1\. Batal/X → tutup modal         |                       |                      |
| ---                                                | ---                               | ---                   | ---                  |
| 2\. Simpan → proses keputusan                      |                                   |                       |
| ---                                                | ---                               | ---                   | ---                  |
| **Default Value & Data Source**                    | TIDAK ADA                         |                       |                      |
| ---                                                | ---                               | ---                   | ---                  |
| **Validasi Field**                                 | TIDAK ADA                         |                       |                      |
| ---                                                | ---                               | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**               | Simpan → popup sukses             |                       |                      |
| ---                                                | ---                               | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                        | Finalisasi approval               |                       |                      |
| ---                                                | ---                               | ---                   | ---                  |
| **Case Preventif**                                 | TIDAK ADA DATA                    |                       |                      |
| ---                                                | ---                               | ---                   | ---                  |

## **Setting Promo Subscription - Butuh Approval - Detail - Berhasil Simpan LW-SPS-70**

| **Kategori**                                       | **Rules**                               | **HW Frontend (jam)** | **HW Backend (jam)** |
| -------------------------------------------------- | --------------------------------------- | --------------------- | -------------------- |
| **Komponen UI & Layout**                           | 1\. Popup sukses dengan animasi         |                       |                      |
| ---                                                | ---                                     | ---                   | ---                  |
| 2\. Pesan "Data berhasil disimpan"                 |                                         |                       |
| ---                                                | ---                                     | ---                   | ---                  |
| 3\. Button OK                                      |                                         |                       |
| ---                                                | ---                                     | ---                   | ---                  |
| **List Tombol dan Elemen Interaktif**              | Button OK                               |                       |                      |
| ---                                                | ---                                     | ---                   | ---                  |
| **UX Rules**                                       | 1\. Feedback sukses                     |                       |                      |
| ---                                                | ---                                     | ---                   | ---                  |
| 2\. Update status promo                            |                                         |                       |
| ---                                                | ---                                     | ---                   | ---                  |
| 3\. Approve → status "Berjalan" jika tanggal valid |                                         |                       |
| ---                                                | ---                                     | ---                   | ---                  |
| 4\. Reject → pindah ke Riwayat                     |                                         |                       |
| ---                                                | ---                                     | ---                   | ---                  |
| **Interaksi & Navigasi**                           | OK → list Butuh Approval                |                       |                      |
| ---                                                | ---                                     | ---                   | ---                  |
| **Default Value & Data Source**                    | TIDAK ADA                               |                       |                      |
| ---                                                | ---                                     | ---                   | ---                  |
| **Validasi Field**                                 | TIDAK ADA                               |                       |                      |
| ---                                                | ---                                     | ---                   | ---                  |
| **Redirect / Navigasi Setelah Aksi**               | OK → Halaman Butuh Approval             |                       |                      |
| ---                                                | ---                                     | ---                   | ---                  |
| **Keterkaitan Antar Fitur**                        | 1\. Selesaikan flow approval            |                       |                      |
| ---                                                | ---                                     | ---                   | ---                  |
| 2\. Update status promo                            |                                         |                       |
| ---                                                | ---                                     | ---                   | ---                  |
| **Case Preventif**                                 | 1\. Approved → aktif jika tanggal valid |                       |                      |
| ---                                                | ---                                     | ---                   | ---                  |
| 2\. Rejected → ke Riwayat                          |                                         |                       |
| ---                                                | ---                                     | ---                   | ---                  |
