# WEEK 1 Validation Report

## A. Identitas Eksperimen

- Nama proyek: New JConnect Mobile
- Fitur: Transfer Antarbank
- Tahap: Week 1
- Pendekatan: PRD Only
- Versi acuan: PRD versi 1.0
- Tujuan: Memastikan prototype merupakan hasil implementasi awal yang dapat dijalankan dari PRD tanpa spesifikasi UX tambahan.

## B. Tahapan Pengembangan

### Initial Development

Implementasi awal membentuk beranda, form tujuan, perbandingan metode, ringkasan konfirmasi, hasil status, riwayat, dan bantuan dalam HTML, CSS, dan JavaScript vanilla.

### Feature Completion

Penyempurnaan menambahkan penyimpanan riwayat lokal, pembaruan status diproses simulasi, validasi inline, koreksi tujuan, peringatan transfer serupa, dan penyalinan nomor referensi.

### Final Validation

Pengujian akhir dilakukan pada browser dengan server lokal pada viewport desktop dan mobile.

## C. Hasil Pengujian

### Fitur yang berhasil diuji

- Akses menu transfer dari beranda.
- Navigasi beranda, riwayat, dan bantuan.
- Rekening kosong, format rekening tidak valid, dan rekening 8–20 digit.
- Nominal kosong, nominal di bawah minimum, serta batas metode.
- Pemeriksaan dan koreksi penerima serta bank tujuan.
- Pemilihan BI-FAST, Online, dan RTGS.
- Ringkasan penerima, rekening, nominal, biaya, metode, dan total debit.
- Status berhasil, sedang diproses, dan gagal.
- Peringatan apabila transfer serupa masih diproses.
- Penyalinan nomor referensi.
- Riwayat dan penyimpanan browser.
- Pesan koneksi buruk.
- Responsivitas pada 360 px dan 390 px.
- Tidak ada overflow horizontal pada viewport mobile.
- Tidak ada error JavaScript atau console pada pengujian akhir.

### Pemetaan FR

| ID | Hasil | Bukti |
|---|---|---|
| FR-01 | PARTIAL | Tiga status berhasil diuji. Status diproses berubah menjadi berhasil setelah 30 detik pada simulasi, bukan melalui backend real-time. |
| FR-02 | PASS | Arahan menunggu, riwayat, bantuan, dan persetujuan sebelum transfer serupa tersedia. |
| FR-03 | PASS | Nomor referensi muncul pada hasil serta riwayat dan dapat disalin. |
| FR-04 | PASS | Loading, status diproses, dan pesan gangguan tersedia pada simulasi. |
| FR-05 | PASS | Ringkasan memuat semua rincian wajib dan menyediakan koreksi. |
| FR-06 | PASS | Nama penerima dan bank tampil serta verifikasi invalid saat tujuan berubah. |
| FR-07 | PASS | Metode ditampilkan seragam beserta biaya, kecepatan, ketentuan, dan batas. |
| FR-08 | PASS | Menu transfer dapat ditemukan dari beranda. |

### Pemetaan UX

| ID | Hasil | Bukti |
|---|---|---|
| UX-01 | PASS | Status dibedakan melalui warna, ikon, dan teks awam. |
| UX-02 | PASS | Arahan diproses/gagal mencegah pengulangan keliru. |
| UX-03 | PASS | Nomor referensi terlihat pada hasil dan riwayat. |
| UX-04 | PARTIAL | Pesan dan indikator berfungsi pada simulasi; gangguan backend nyata belum tersedia. |
| UX-05 | PASS | Rincian konfirmasi berurutan dan total debit menonjol. |
| UX-06 | PASS | Nama, bank, dan rekening dapat diperiksa serta dikoreksi. |
| UX-07 | PASS | Pemilihan dan batas metode dapat digunakan serta diuji. |
| UX-08 | PASS | Tombol transfer mudah ditemukan dari beranda. |

### Pemetaan NFR

| ID | Hasil | Bukti |
|---|---|---|
| NFR-01 | PASS | Pesan menggunakan bahasa awam. |
| NFR-02 | PASS | Status, tujuan, dan rincian memiliki hierarki visual jelas. |
| NFR-03 | PASS | Status dan komponen metode menggunakan format konsisten. |
| NFR-04 | PASS | Indikator loading dan pesan koneksi tersedia pada simulasi. |
| NFR-05 | PARTIAL | Pembaruan status otomatis tersedia secara lokal; data sistem inti belum tersedia. |
| NFR-06 | PARTIAL | Riwayat dan bantuan tersedia; kanal resmi belum ditentukan. |

### Pemetaan User Stories

| ID | Hasil |
|---|---|
| US-01 Melihat status | PASS |
| US-02 Arahan saat bermasalah | PASS |
| US-03 Bukti dan nomor referensi | PASS |
| US-04 Memahami pesan gangguan | PASS |
| US-05 Memeriksa ringkasan | PASS |
| US-06 Memastikan dan mengoreksi penerima | PASS |
| US-07 Membandingkan metode | PASS |
| US-08 Menemukan menu transfer | PASS |

### Bug yang ditemukan dan perbaikannya

- Kartu penerima terverifikasi tetap tampil setelah rekening atau bank berubah.
  - Diperbaiki dengan menghapus kartu verifikasi dan mengubah state menjadi belum terverifikasi saat input tujuan berubah.
- Pesan rekening kosong awalnya kurang spesifik.
  - Diperbaiki menjadi pesan wajib diisi yang ditampilkan sebagai field error.
- Peringatan duplikat belum mempertimbangkan bank tujuan.
  - Diperbaiki agar bank juga menjadi bagian pemeriksaan transaksi serupa.

## D. Evaluasi Akhir

### Kebutuhan yang telah terpenuhi

Sebagian besar alur transfer, status, konfirmasi, koreksi, riwayat, referensi, peringatan, dan navigasi telah tersedia serta dapat diuji sebagai simulasi.

### Kebutuhan yang belum terpenuhi

- Integrasi sistem inti perbankan.
- Verifikasi penerima dari data nyata.
- Pembaruan status transaksi dari backend real-time.
- Kanal Customer Service resmi.
- Evaluasi usability formal dengan peserta.
- Kebijakan operasional durasi status diproses.

### Faktor keterbatasan implementasi

Tidak ada backend atau API pada lingkungan eksperimen. Karena itu seluruh rekening, penerima, biaya, status, dan nomor referensi hanya merupakan data simulasi lokal.

### Rekomendasi pengembangan selanjutnya

- Integrasikan API rekening dan nama penerima.
- Integrasikan status transaksi, referensi, dan riwayat dari sistem inti.
- Tambahkan kanal Customer Service resmi.
- Tentukan durasi serta kebijakan status diproses.
- Tambahkan regression test otomatis untuk seluruh alur utama.
- Jalankan evaluasi usability formal untuk mengukur target 90% dan 85%.

## E. Kesimpulan

Pendekatan PRD Only menghasilkan aplikasi baseline yang dapat dijalankan, responsif, dan mencakup sebagian besar kebutuhan transfer antarbank pada PRD. Keterbatasan utama adalah ketergantungan pada simulasi lokal dan tidak tersedianya integrasi serta evaluasi operasional nyata.

Repository Week 1 dapat dijadikan baseline, dengan status tersebut dicatat transparan dan tanpa klaim bahwa aplikasi melakukan transaksi perbankan sungguhan.
