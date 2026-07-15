# PRD — BINA (Belajar Inklusif, Nalar & Aksi)

> **Product Requirements Document**
> Versi: 1.0 · Tanggal: 15 Juli 2026 · Konteks: **Lomba / Hackathon (demo-first)**
> Dokumen pendamping: [STATUS.md](STATUS.md) (kondisi kode) · [ROADMAP.md](ROADMAP.md) (checklist eksekusi)

---

## 1. Latar Belakang & Masalah

Pembelajaran digital di Indonesia umumnya menekankan capaian akademik (nilai ujian) dan
kurang memberi ruang pada pembentukan **karakter** (Profil Pelajar Pancasila / P5). Di sisi
lain, ruang diskusi daring rawan **perundungan (cyberbullying)**, dan banyak siswa —
terutama di kelas awal, penyandang disabilitas, dan daerah 3T — **tertinggal secara akses**
(literasi rendah, keterbatasan penglihatan, koneksi internet buruk).

**BINA** menjawabnya dengan platform yang:
1. Menilai **karakter**, bukan sekadar nilai, lewat aksi nyata & refleksi.
2. Menjaga ruang diskusi tetap **aman** dengan moderasi berlapis (klien + AI).
3. **Inklusif** by design: Text-to-Speech, kontras tinggi, ukuran teks fleksibel, mode offline.

## 2. Visi Produk

> "Setiap anak Indonesia — di mana pun, dengan kemampuan apa pun — bisa belajar, berkarya,
> dan tumbuh sebagai Pelajar Pancasila di ruang digital yang aman."

## 3. Target Pengguna (Persona)

| Persona | Peran | Kebutuhan utama |
|---|---|---|
| **Siti (Siswa, kelas 5)** | Siswa | Belajar seru, bertanya tanpa takut diejek, pamer karya, main battle |
| **Budi (Siswa tunanetra)** | Siswa (disabilitas) | Semua konten bisa didengar, navigasi jelas |
| **Bu Rina (Guru)** | Guru/Moderator | Memantau diskusi, menilai aksi siswa, melihat perkembangan karakter kelas |
| **Pak Admin (Operator sekolah)** | Admin | Kelola sekolah, akun, dan data platform |

## 4. Tujuan & Metrik Sukses (untuk Demo)

| Tujuan | Metrik demo |
|---|---|
| Menunjukkan moderasi aman | Kata kasar tersaring **instan** di layar (klien) + contoh deteksi AI lapis 2 |
| Menunjukkan inklusivitas | Tombol "Dengar" benar-benar mengeluarkan suara Bahasa Indonesia |
| Menunjukkan karakter > nilai | Leaderboard & poin karakter tampil dari data nyata |
| Alur mulus & responsif | Navigasi antar modul tanpa error, data konsisten (bukan mock) |

## 5. Ruang Lingkup

### 5.1 In-Scope (yang dibangun untuk demo)
Modul 1–7 + 3 dashboard sesuai brief, dengan **kedalaman implementasi disesuaikan prioritas**
(lihat §7). Fitur AI, TTS, dan filter kata kasar minimal **satu jalur end-to-end yang benar-benar
berjalan** saat presentasi.

### 5.2 Out-of-Scope (untuk versi hackathon)
- Skala produksi (multi-tenant sekolah, billing, SSO).
- Aplikasi mobile native (cukup web responsif).
- Offline sync penuh dengan konflik-resolusi (cukup demonstrasi konsep/sebagian).
- Sertifikasi keamanan/aksesibilitas formal (WCAG audit menyeluruh).

---

## 6. Kebutuhan Fungsional per Modul

Notasi status: ✅ ada · 🟡 sebagian (UI mock) · ❌ belum. (Rujuk [STATUS.md](STATUS.md).)

### M1 — Belajar Bareng (Forum Termoderasi)
- **F1.1** Daftar forum per mata pelajaran (cari & filter). — 🟡 UI ada, data mock
- **F1.2** Ruang diskusi: thread + balasan. — 🟡 UI ada, data mock
- **F1.3** Buat topik & kirim balasan (tersimpan ke DB). — ❌
- **F1.4** **Filter kata kasar sisi klien** (indonesian-badwords) di input, sebelum kirim. — ❌
- **F1.5** **Moderasi AI lapis 2** (Llama) untuk agresi pasif/bullying yang lolos filter. — ❌
- **F1.6** Voice reply (rekam & unggah audio). — ❌
- **F1.7** Moderator guru dapat mengunci/menyembunyikan konten. — ❌
- **Desain:** `cari_forum_belajar`, `diskusi_forum`.

### M2 — Karya-Ku (Jurnal Aksi Nyata)
- **F2.1** Galeri karya (tulisan/gambar/puisi/prakarya). — 🟡 UI ada, data mock
- **F2.2** Unggah karya + media (foto/video ke **R2**). — ❌
- **F2.3** Laporan aksi nyata dengan bukti foto. — ❌
- **F2.4** Validasi silang: persetujuan teman/guru → **Poin Karakter**. — ❌
- **F2.5** Reaksi emoji positif (👍❤️🎉), tanpa kolom komentar bebas. — 🟡 UI, tanpa persistensi
- **Desain:** `galeri_karya_ku`.

### M3 — Dengar & Baca (Aksesibilitas Inklusif)
- **F3.1** **Text-to-Speech** semua teks (materi/forum/karya) via **Azure GadisNeural**. — ❌
- **F3.2** Kontrol kecepatan bicara & pilihan suara. — 🟡 UI kontrol statis
- **F3.3** Mode **kontras tinggi**. — 🟡 tombol ada, belum menerapkan
- **F3.4** Ukuran teks fleksibel tanpa merusak layout. — 🟡 tombol ada, belum menerapkan
- **F3.5** Preferensi tersimpan per user (`users.accessibility_preferences`). — ❌
- **Desain:** `pengaturan_aksesibilitas`.

### M4 — Simulasi Battle HOTS
- **F4.1** Cari/tantang lawan + matchmaking. — 🟡 UI cari lawan; state lain ❌
- **F4.2** Soal berbasis skenario nyata + timer (mis. 30 dtk). — 🟡 UI ada, soal mock
- **F4.3** Hasil menang/kalah + poin. — 🟡 UI gabung (prop `win`)
- **F4.4** Review jawaban + reveal benar/salah + penjelasan. — ❌
- **F4.5** Bank soal HOTS (dari `battle_questions`, dapat di-generate AI). — ❌
- **Desain:** `mencari_lawan_battle`, `tantang_lawan`, `lawan_ditemukan`, `pertanyaan_battle_hots`,
  `hasil_kamu_menang`, `hasil_kamu_kalah`. (State loading/accept/review belum ada desain.)

### M5 — Offline Sync (Mode 3T)
- **F5.1** Unduh materi/forum/kuis satu kali saat online. — ❌
- **F5.2** Rekam aktivitas lokal saat offline (localStorage/IndexedDB). — ❌
- **F5.3** Sinkronisasi otomatis saat kembali online. — ❌
- **F5.4** Arsitektur "lite" untuk gawai spesifikasi rendah. — ❌
- **Desain:** `sinkronisasi_offline`. *(Kompleks; untuk demo boleh sebagian/di-mock — lihat §7.)*

### M6 — AI Generate Dashboard (Notebook LLM) — untuk Guru
- **F6.1** Grafik perkembangan karakter siswa. — ❌
- **F6.2** Analisis sentimen jurnal/diskusi/proyek (background job + Llama). — ❌
- **F6.3** Pemetaan otomatis ke dimensi P5 (Bernalar Kritis, Gotong Royong, dll). — ❌
- **Desain:** `dashboard_analitik_ai_guru`.

### M7 — Leaderboard Karakter
- **F7.1** Peringkat 100% berbasis **Poin Karakter** (bukan nilai ujian). — 🟡 UI ada, data mock
- **F7.2** Top 1 per **bidang** (mis. Matematika) & Top 1 **sekolah**. — 🟡 tab ada, logika ❌
- **F7.3** Poin top-sekolah bisa berasal dari **penilaian guru** (guru menentukan nilai). — ❌
- **F7.4** Gelar & lencana (Duta Anti-Hoaks, Pahlawan Lingkungan, dll). — 🟡 UI, tanpa logika
- **Desain:** `peringkat_top_1_sekolah`.

### M8/M9/M10 — Dashboard Siswa / Guru / Admin
- **F8** Dashboard siswa: ringkasan poin, aktivitas, aksi cepat. — 🟡 UI ada, data mock. Desain `dashboard_siswa`.
- **F9** Dashboard guru: moderasi + penilaian + analitik. — 🟡 UI ada. Desain `dashboard_admin_guru` (+ M6).
- **F10** Dashboard admin: kelola sekolah/akun/data. — 🟡 UI improvisasi, **tanpa desain referensi** (perlu keputusan, lihat §9).

---

## 7. Prioritas Implementasi (Demo-First)

Prinsip: **satu jalur yang benar-benar hidup > banyak fitur setengah jadi.**

### 🔴 P1 — Fondasi kredibilitas (wajib)
1. Auth berfungsi + `auth.user` dibagikan ke Inertia (nama/role muncul di UI).
2. **Seeder demo kaya**: sekolah, user (siswa/guru/admin), kategori forum, thread+reply,
   karya, badge, soal HOTS, poin karakter → semua halaman tampil dari data nyata.
3. Halaman utama membaca props server (buang mock di minimal Dashboard, Forum, Leaderboard).

### 🟠 P2 — "Wow factor" demo (usaha sedang, dampak besar)
4. **Filter kata kasar sisi klien** aktif di input forum & karya (efek instan on-screen).
5. **Text-to-Speech Azure** pada tombol "Dengar" (bukti inklusivitas yang terdengar).
6. **Satu fitur AI Llama end-to-end**: pilih **moderasi forum** *atau* **evaluasi P5**.
7. Controller CRUD minimal Forum (buat topik/balas) & Karya (unggah).

### 🟡 P3 — Pelengkap (jika waktu ada)
8. Upload media R2 untuk Karya-Ku.
9. State battle yang kurang (tantang/ditemukan/review/reveal) + timer nyata.
10. Dashboard analitik AI Guru (M6) + persistensi preferensi aksesibilitas.
11. Offline sync (versi demonstratif).

---

## 8. Kebutuhan Non-Fungsional

| Kategori | Kebutuhan |
|---|---|
| **Aksesibilitas** | Kontras tinggi, skala teks, TTS, navigasi keyboard dasar, alt-text |
| **Performa** | SPA responsif; halaman awal < 2 dtk di jaringan sedang |
| **Keamanan** | Filter toksisitas berlapis; validasi input; rahasia di `.env` (bukan repo) |
| **Biaya** | R2 zero-egress; panggilan AI **asinkron via queue** untuk hemat kuota |
| **Kompatibilitas** | Berjalan mulus di gawai spesifikasi rendah (target 3T) |
| **Privasi anak** | Tanpa kolom komentar bebas di Karya; data siswa minimal & terlindungi |

## 9. Pertanyaan Terbuka (perlu keputusan pemilik)

1. **Dashboard Admin tanpa desain** — apakah dibuat mengikuti gaya dashboard guru, dipangkas
   dari scope demo, atau menunggu desain baru?
2. **Fitur AI mana yang jadi bintang demo** — moderasi forum atau evaluasi P5? (Rekomendasi:
   moderasi forum, karena efeknya paling terlihat & interaktif saat presentasi.)
3. **Provider Llama** — pakai Groq (cepat, gratis-tier) sesuai default config, atau lainnya?
4. **Offline sync** — tampilkan sebagai fitur nyata (butuh usaha besar) atau cukup
   diceritakan + UI status? (Rekomendasi: cukup demonstratif untuk hackathon.)
5. **Data demo** — pakai nama/sekolah fiktif, atau ada sekolah/kelas spesifik untuk cerita demo?

## 10. Referensi Desain

Seluruh desain visual ada di [`stitch_inklusif_belajar_karakter_app/`](../stitch_inklusif_belajar_karakter_app)
(satu folder per layar: `code.html` + `screen.png`). Token warna/tipografi:
[`bina_vibrant_learning/DESIGN.md`](../stitch_inklusif_belajar_karakter_app/bina_vibrant_learning/DESIGN.md).
