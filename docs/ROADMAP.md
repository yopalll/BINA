# Roadmap & Checklist Eksekusi — BINA

> Checklist teknis turunan dari [PRD.md](PRD.md) & [STATUS.md](STATUS.md).
> Konteks: **hackathon/demo**. Urutan = urutan pengerjaan yang disarankan.
> Centang `[x]` saat selesai.

---

## 🔴 Fase 1 — Fondasi (wajib untuk demo kredibel)

### 1.1 Autentikasi
- [ ] Buat `AuthController` (`showLogin`, `login`, `logout`).
- [ ] Tambah route `POST /login` dan `POST /logout`.
- [ ] Bagikan `auth.user` (id, name, role, avatar, poin) di `HandleInertiaRequests::share()`.
- [ ] Verifikasi nama & role user muncul di sidebar `AppLayout`.
- [ ] (Opsional) Middleware `role` untuk memisahkan area siswa/guru/admin.

### 1.2 Seeder Data Demo
- [ ] `SchoolSeeder` — 1–2 sekolah.
- [ ] `UserSeeder` — beberapa siswa, 1–2 guru, 1 admin (password diketahui untuk demo).
- [ ] `ForumSeeder` — kategori (Matematika, B.Indo, IPA, dll) + thread + reply.
- [ ] `KaryaSeeder` — beberapa karya berbagai tipe + reaksi.
- [ ] `BadgeSeeder` — badge (Duta Anti-Hoaks, Pahlawan Lingkungan, dll).
- [ ] `BattleQuestionSeeder` — 10–20 soal HOTS skenario nyata + opsi + penjelasan.
- [ ] `CharacterPointSeeder` — poin tersebar agar leaderboard terisi.
- [ ] Daftarkan semua di `DatabaseSeeder`; jalankan `php artisan migrate:fresh --seed`.

### 1.3 Halaman baca data nyata (buang mock)
- [ ] `DashboardController` → kirim statistik & aktivitas nyata ke `Dashboard`.
- [ ] `ForumController@index` → kategori & thread dari DB ke `Forum/Index`.
- [ ] `LeaderboardController@index` → peringkat nyata (per bidang & sekolah) ke `Leaderboard/Index`.

---

## 🟠 Fase 2 — "Wow Factor" Demo

### 2.1 Filter Kata Kasar Sisi Klien (cepat, efek instan)
- [ ] Buat hook/util `useProfanityFilter` memakai `indonesian-badwords`.
- [ ] Terapkan di input "Buat Topik"/"Balas" (Forum) & "Unggah Karya".
- [ ] Beri umpan balik visual saat kata terdeteksi (highlight/peringatan) sebelum kirim.

### 2.2 Text-to-Speech (Azure GadisNeural)
- [ ] `TtsController` / `SpeechService` memanggil Azure Speech (server-side, aman untuk key).
- [ ] Endpoint `POST /tts` (teks → audio stream/URL, dengan cache sederhana).
- [ ] Komponen React `SpeakButton` (🔊) di teks materi/forum/karya.
- [ ] Kontrol kecepatan & pilihan suara terhubung ke request.

### 2.3 Satu Fitur AI Llama End-to-End (pilih satu — lihat PRD §9)
**Opsi A — Moderasi Forum (rekomendasi, paling interaktif):**
- [ ] `LlamaService` (HTTP client ke endpoint kompatibel OpenAI, mis. Groq).
- [ ] `ModerateReply` Job (queue) — analisis sentimen/bullying saat balasan dibuat.
- [ ] Set `is_moderated` + sembunyikan/tandai konten toksik; tampilkan status di UI.

**Opsi B — Evaluasi P5:**
- [ ] `EvaluateP5` Job — baca jurnal/aksi → metrik dimensi P5 → simpan `character_points`.
- [ ] Tampilkan hasil di Dashboard Guru.

### 2.4 CRUD Inti
- [ ] `ForumController@storeThread`, `@storeReply` (+ FormRequest validasi).
- [ ] `KaryaController@store` (metadata; media menyusul di Fase 3).
- [ ] Reaksi emoji Karya tersimpan (`KaryaReaction`).

---

## 🟡 Fase 3 — Pelengkap (jika waktu tersisa)

### 3.1 Upload Media R2 (Karya-Ku)
- [ ] Isi kredensial R2 di `.env`.
- [ ] `KaryaController@store` unggah foto/video ke disk `r2`, simpan `media_url`.
- [ ] Tampilkan media di galeri.

### 3.2 Battle — lengkapi state & alur
- [ ] Halaman `Battle/Challenge` (tantang lawan) — desain `tantang_lawan`.
- [ ] Halaman `Battle/MatchFound` (lawan ditemukan) — desain `lawan_ditemukan`.
- [ ] State loading matchmaking + "lawan menerima" (belum ada desain → improvisasi selaras).
- [ ] Pisah `Battle/Result` menang vs kalah (desain `hasil_kamu_menang` / `hasil_kamu_kalah`).
- [ ] Review jawaban + reveal benar/salah + penjelasan (belum ada desain).
- [ ] Timer nyata per soal + skoring dari `battle_questions`.

### 3.3 Dashboard Analitik AI Guru (M6)
- [ ] Halaman terpisah — desain `dashboard_analitik_ai_guru`.
- [ ] Grafik perkembangan karakter (chart) + ringkasan sentimen + peta dimensi P5.

### 3.4 Aksesibilitas persisten
- [ ] Context/store global preferensi (kontras, ukuran teks, suara).
- [ ] Terapkan ke seluruh layout (CSS variabel / class high-contrast).
- [ ] Simpan ke `users.accessibility_preferences` & muat saat login.

### 3.5 Offline Sync (versi demonstratif)
- [ ] Service worker dasar + cache aset/materi terpilih.
- [ ] Simpan draf/aktivitas ke localStorage saat offline.
- [ ] Indikator status sinkronisasi (desain `sinkronisasi_offline`) + sinkron saat online.

---

## 🧹 Sudah Dibersihkan (selesai)
- [x] Hapus folder sampah `stitch_.../image.png/`.
- [x] Flatten struktur desain bertingkat ganda → satu level.
- [x] Hapus `resources/js/app.js` kosong & `welcome.blade.php` tak terpakai.
- [x] Perbaiki urutan migrasi `schools` sebelum `users`.
- [x] Perbaiki kolasi emoji MySQL (`utf8mb4_0900_ai_ci`).

---

## ❓ Keputusan yang Ditunggu (blok sebagian Fase 3)
Lihat [PRD.md §9](PRD.md#9-pertanyaan-terbuka-perlu-keputusan-pemilik):
- [ ] Nasib **Dashboard Admin** (tanpa desain).
- [ ] **Fitur AI bintang** demo (moderasi vs P5).
- [ ] Provider **Llama** (Groq/lainnya).
- [ ] Kedalaman **Offline sync** (nyata vs demonstratif).
- [ ] Skenario & **data demo** (sekolah/kelas cerita).
