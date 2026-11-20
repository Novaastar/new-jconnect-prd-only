# New JConnect — Transfer Antarbank

Prototipe web mobile-first untuk alur transfer antarbank pada aplikasi New JConnect Mobile milik Bank Jatim. Proyek ini dibuat sebagai baseline **Eksperimen Week 1 – PRD Only** menggunakan dokumen PRD sebagai satu-satunya acuan kebutuhan produk.

## Tujuan

Aplikasi membantu pengguna berlatih dan mengevaluasi alur:

1. Membuka beranda dan menemukan menu transfer.
2. Mengisi bank, rekening, dan nominal.
3. Memilih metode transfer.
4. Memeriksa rincian sebelum konfirmasi.
5. Memastikan status, bukti, dan referensi transaksi.
6. Mendapat arahan saat transaksi gagal atau diproses.

## Teknologi

- HTML5
- CSS3
- JavaScript vanilla
- Penyimpanan browser `localStorage`
- Server statis Python untuk pengembangan lokal

Tidak menggunakan framework frontend, backend, API, atau layanan perbankan eksternal.

## Struktur direktori

```text
.
|-- index.html                 # Struktur halaman dan navigasi
|-- style.css                  # Tampilan mobile-first dan komponen
|-- app.js                     # State, validasi, simulasi, dan navigasi
|-- PRD.md                     # Ringkasan acuan kebutuhan produk tanpa data pribadi
|-- WEEK1_VALIDATION_REPORT.md # Laporan hasil validasi Week 1
|-- README.md                  # Dokumentasi proyek
|-- .gitignore                 # Berkas lokal yang tidak dipublikasikan
```

Sumber PRD asli berupa `PRD_New_JConnect_Mobile_Transfer_Antarbank_v1.0.docx` pada workspace awal. Berkas tersebut mengandung data identitas dan sengaja tidak disertakan pada repository publik.

## Menjalankan aplikasi

1. Pastikan Python tersedia.
2. Jalankan dari folder proyek:

   ```powershell
   python -m http.server 8000
   ```

3. Buka `http://localhost:8000`.

Alternatif: buka `index.html` langsung pada browser. Server lokal direkomendasikan agar perilaku browser konsisten.

## Alur demo

1. Dari beranda, pilih **Transfer**.
2. Pilih bank dan masukkan nomor rekening 8–20 digit.
3. Tekan **Cek penerima**, lalu masukkan nominal minimal Rp10.000.
4. Bandingkan BI-FAST, Online, dan RTGS.
5. Periksa penerima, rekening, nominal, biaya, metode, dan total debit.
6. Pilih skenario **Berhasil**, **Diproses**, atau **Gagal** pada halaman konfirmasi.
7. Buka hasil transaksi atau riwayat untuk melihat nomor referensi.

Contoh rekening demo: `1234567890` atau `9988776655`.

## Fitur tersedia

- Beranda dengan pintasan transfer, riwayat, bantuan, dan koneksi.
- Verifikasi dan koreksi tujuan pada layar transfer.
- Validasi rekening dan nominal.
- Perbandingan metode beserta biaya, kecepatan, ketentuan, dan batas.
- Ringkasan konfirmasi dengan total debit.
- Peringatan transfer serupa yang masih diproses.
- Status berhasil, diproses, dan gagal.
- Pembaruan status diproses menjadi berhasil setelah 30 detik pada simulasi.
- Riwayat persisten pada browser dan detail nomor referensi.
- Penyalinan nomor referensi.
- Pesan dan navigasi bantuan.
- Tampilan mobile-first tanpa overflow pada pengujian 360 px dan 390 px.

## Informasi simulasi dan keterbatasan

Seluruh transaksi, rekening, nama penerima, biaya, status, dan nomor referensi merupakan data simulasi. Aplikasi tidak terhubung ke rekening, API, sistem inti perbankan, atau layanan Customer Service resmi Bank Jatim.

Keterbatasan yang belum terpenuhi:

- Verifikasi nama penerima menggunakan data simulasi.
- Pembaruan status belum berasal dari backend real-time.
- Kanal dan nomor Customer Service resmi belum tersedia.
- Evaluasi usability formal dengan peserta belum dilakukan.
- Kebijakan durasi status diproses belum ditentukan.

## Status pengujian

Pengujian browser telah mencakup navigasi, formulir, validasi, koreksi tujuan, metode, semua status transaksi, riwayat, referensi, pencegahan duplikasi, koneksi, dan viewport mobile. Tidak ditemukan error JavaScript atau overflow pada pengujian akhir.

Hasil lengkap tersedia pada [WEEK1_VALIDATION_REPORT.md](./WEEK1_VALIDATION_REPORT.md). Acuan produk tersedia pada [PRD.md](./PRD.md).
