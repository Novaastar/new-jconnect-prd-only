# New JConnect — Transfer Antarbank

Prototipe web mobile-first untuk alur transfer antarbank berdasarkan PRD New JConnect Mobile. Aplikasi ini berjalan sepenuhnya di browser dan menggunakan data simulasi; tidak terhubung ke rekening atau sistem Bank Jatim.

## Menjalankan aplikasi

1. Pastikan Python tersedia.
2. Dari folder proyek, jalankan:

   ```powershell
   python -m http.server 8000
   ```

3. Buka `http://localhost:8000`.

Alternatif: buka `index.html` langsung di browser. Aplikasi tidak memerlukan instalasi paket atau layanan backend.

## Alur demo

1. Dari beranda, pilih **Transfer**.
2. Pilih bank, masukkan nomor rekening 8–20 digit (contoh `1234567890`), tekan **Cek penerima**, lalu masukkan nominal minimal Rp10.000.
3. Bandingkan BI-FAST, Online, dan RTGS; biaya, waktu, ketentuan, dan batas pada prototipe adalah data contoh.
4. Periksa ringkasan penerima, nominal, biaya, metode, dan total debit. Pada halaman konfirmasi, pilih skenario **Berhasil**, **Diproses**, atau **Gagal** untuk mencoba tampilan status.
5. Buka **Riwayat** untuk melihat status dan nomor referensi demo. Pada status diproses, aplikasi mengarahkan pengguna agar tidak mengulang transfer.

## Cakupan prototipe

Antarmuka mencakup halaman beranda, verifikasi tujuan simulasi, perbandingan metode, konfirmasi dan koreksi tujuan, peringatan transfer serupa yang masih diproses, hasil tiga status transaksi, riwayat, indikator koneksi, dan bantuan kontekstual. Data transaksi hanya tersimpan selama halaman terbuka; memuat ulang halaman akan mengembalikan data demo awal.
