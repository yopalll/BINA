# Laporan Status Proyek BINA

> Dokumen ini adalah hasil audit menyeluruh terhadap kondisi kode saat ini.
> Konteks proyek: **Lomba / Hackathon (fokus demo)**.
> Tanggal audit awal: 15 Juli 2026 · **Diperbarui: 16 Juli 2026** (setelah eksekusi roadmap).

---

## 0. Pembaruan 16 Juli 2026 — Roadmap Dieksekusi ✅

Seluruh gap kritis pada audit awal (di bawah) **sudah dikerjakan**. Ringkasan yang berubah:

| Sebelumnya ❌/🟡 | Sekarang | Bukti |
|---|---|---|
| 0 controller | ✅ 10 controller (Auth, Dashboard, Forum, Karya, Battle, Leaderboard, Aksesibilitas, Offline, Guru, Admin, Tts) | `app/Http/Controllers/` |
| Auth putus | ✅ Login/logout jalan, guard role guru/admin | `AuthController`, `EnsureRole` |
| `auth.user` tak dibagi | ✅ Dibagikan + tampil di sidebar | `HandleInertiaRequests::share()` |
| Semua halaman mock | ✅ Semua baca data nyata dari DB | seeder + controllers |
| Filter kata kasar tak dipakai | ✅ Aktif di input forum & karya (efek instan) | `lib/profanity.js`, `useProfanityFilter` |
| AI Llama belum ada | ✅ Moderasi forum (Job async) + fallback heuristik | `LlamaService`, `ModerateForumReply` |
| TTS belum ada | ✅ `SpeakButton` (Azure + fallback Web Speech) | `Components/SpeakButton.jsx`, `TtsController` |
| Upload R2 belum ada | ✅ Upload Karya ke R2 (fallback disk lokal) | `KaryaController@store` |
| Battle kurang state | ✅ Matchmaking (cari/tantang/ditemukan), timer nyata, skoring, review benar/salah | `Battle/*` |
| Analitik guru & admin | ✅ `Guru/Analytics` (P5) + `Admin/Dashboard` gaya guru | dibuat baru |
| Aksesibilitas tak persisten | ✅ Context global, kontras & skala teks diterapkan + disimpan | `AccessibilityProvider` |
| Offline belum ada | ✅ Service worker + localStorage + indikator online (demonstratif) | `public/sw.js`, `Offline/Index` |
| Tidak ada test domain | ✅ 12 test (auth, RBAC, forum, moderasi, battle, aksesibilitas) — semua lolos | `tests/Feature/SmokeTest.php` |

**Keputusan pemilik (16 Juli):** kredensial live belum ada → semua integrasi dibangun dengan
**fallback** (tinggal isi `.env` untuk aktif live); fitur AI fokus **moderasi forum**;
Dashboard Admin **mengikuti gaya guru**; Offline **demonstratif**.

**Akun demo** (password semua: `password`): `siswa@bina.id`, `guru@bina.id`, `admin@bina.id`.

Sisa yang sengaja ditunda (opsional, bukan blocker demo): voice-reply rekam audio,
offline sync konflik-resolusi penuh, registrasi mandiri (self-register).

---

---

## 1. Ringkasan Eksekutif

Proyek BINA saat ini berada pada fase **"UI shell + skema database"**. Kerangka aplikasi
(Laravel 13 + Inertia + React 19) sudah berdiri, seluruh halaman utama sudah punya tampilan,
dan skema database untuk semua modul sudah lengkap dan bisa dimigrasi. **Namun hampir semua
halaman masih menampilkan data statis (mock), dan belum ada satu pun logika backend
(controller, service, job) yang berjalan.** Fitur andalan (AI moderasi/P5, Text-to-Speech,
upload R2, offline sync, filter kata kasar sisi klien) baru ada di level konfigurasi/paket,
belum terhubung ke UI.

**Analogi:** rumahnya sudah jadi dan dicat rapi, tapi listrik, air, dan pipa gas belum
disambung.

| Aspek | Status | Keterangan |
|---|---|---|
| Scaffold & tooling | ✅ Selesai | Laravel 13, Vite, React 19, Inertia, Tailwind v4 |
| Skema database | ✅ Selesai | 15 migrasi, migrate + seed jalan di MySQL 8 |
| Model & relasi | ✅ Selesai | 13 model domain dengan relasi Eloquent |
| Tampilan (UI) | 🟡 Sebagian | 13 halaman ada, **semua pakai data mock** |
| Routing | 🟡 Sebagian | Hanya GET (tampilan). Tidak ada endpoint aksi/data |
| Controller & logika | ❌ Belum | **0 controller.** Semua route = closure statis |
| Autentikasi | ❌ Rusak | Halaman login ada, tapi POST `/login` tidak ada → login gagal |
| Integrasi AI (Llama) | ❌ Belum | Config ada, tidak ada client/job/moderasi |
| Text-to-Speech (Azure) | ❌ Belum | Config ada, tidak ada service/UI |
| Storage R2 | ❌ Belum | Disk terdaftar, tidak ada handler upload |
| Filter kata kasar (klien) | ❌ Belum | Paket terpasang, **tidak dipakai di input mana pun** |
| Offline sync | ❌ Belum | Halaman statis, tidak ada service worker/localStorage |
| Testing domain | ❌ Belum | Hanya 2 test bawaan Laravel |

---

## 2. Yang SUDAH Dikerjakan ✅

### 2.1 Infrastruktur & Setup
- Laravel 13 (PHP 8.5) + Composer, dependency lengkap terpasang.
- Frontend React 19 + Inertia.js + Vite 8 + Tailwind v4. `npm run build` sukses.
- Database dipindah dari SQLite → **MySQL 8** (sesuai lingkungan lokal pemilik).
- Konfigurasi disk **Cloudflare R2** (`config/filesystems.php`) + paket `league/flysystem-aws-s3-v3`.
- Konfigurasi service **Llama** & **Azure Speech** (`config/services.php`) + variabel `.env`.
- Paket npm `indonesian-badwords` terpasang.
- README lengkap + catatan bug kolasi emoji MySQL.

### 2.2 Database (15 migrasi, semua jalan)
`schools`, `users` (role siswa/guru/admin, poin karakter, preferensi aksesibilitas),
`forum_categories`, `forum_threads`, `forum_replies` (voice_url, reactions),
`karyas`, `karya_reactions` (emoji 👍❤️🎉), `battle_matches`, `battle_questions` (skenario HOTS + opsi JSON),
`character_points` (dimensi P5), `badges`, `user_badges`, `offline_contents`.

### 2.3 Model Eloquent (13 model)
Semua model punya `$fillable`, cast, dan relasi antar-entitas yang benar
(User↔School, Forum, Karya↔Reaction, Battle, CharacterPoint, Badge, dll).

### 2.4 Halaman UI (13 halaman Inertia — tampilan saja)
`Dashboard` (siswa), `Forum/Index`, `Forum/Show`, `Karya/Index`, `Battle/Index`,
`Battle/Play`, `Battle/Result` (win/lose via prop), `Leaderboard/Index` (tab sekolah/bidang),
`Aksesibilitas/Index`, `Offline/Index`, `Guru/Dashboard`, `Admin/Dashboard`, `Auth/Login`.
Semua memakai `AppLayout` (sidebar + top bar) dan design token dari `resources/css/app.css`.

---

## 3. Yang BELUM Dikerjakan ❌ (Daftar Gap)

### 3.1 Backend — Kritis
| # | Gap | Dampak |
|---|---|---|
| B1 | **Tidak ada controller apa pun.** Semua route adalah closure yang me-render halaman statis. | Tidak ada data nyata, tidak ada aksi (buat topik, kirim balasan, unggah karya, dsb). |
| B2 | **Autentikasi putus.** `Login.jsx` mengirim POST ke `/login`, tapi route itu tidak ada (hanya GET). Tidak ada `AuthController`, register, logout. | Login tidak berfungsi. |
| B3 | **`HandleInertiaRequests::share()` tidak membagikan `auth.user`.** | Sidebar selalu menampilkan "Pengguna/U" — nama & role user tidak pernah muncul. |
| B4 | Tidak ada FormRequest, Policy, Action, atau Service layer. | Tidak ada validasi/otorisasi. |
| B5 | Tidak ada Job/Queue. | Spec menekankan pemanggilan API eksternal **asinkron** — belum ada sama sekali. |
| B6 | Seeder domain kosong (hanya 1 test user). | Tidak ada kategori forum, badge, soal battle, atau data contoh untuk demo. |

### 3.2 Integrasi Fitur Andalan — Kritis untuk Demo
| # | Gap | Modul terkait |
|---|---|---|
| I1 | **AI Llama belum terintegrasi** — tidak ada client HTTP, tidak ada moderasi teks, tidak ada evaluasi P5. | Forum (moderasi), Dashboard Guru (analitik P5) |
| I2 | **Azure TTS belum terintegrasi** — tombol "dengar" belum menghasilkan audio. | Dengar & Baca, Forum, Karya |
| I3 | **Upload R2 belum ada** — modul Karya-Ku tidak bisa menerima foto/video. | Karya-Ku |
| I4 | **Filter `indonesian-badwords` tidak dipakai** di input forum/karya mana pun. | Forum, Karya |
| I5 | **Offline sync tidak ada logika** — tidak ada service worker, cache, atau localStorage. | Offline Sync |
| I6 | Tombol **voice reply** di forum belum merekam/mengunggah audio. | Forum |
| I7 | Pengaturan aksesibilitas (kontras tinggi, ukuran teks, kecepatan suara) **tidak tersimpan & tidak diterapkan**. | Dengar & Baca |

### 3.3 Frontend — Data & Interaktivitas
- Semua halaman memakai array mock hardcoded; belum ada yang mengonsumsi props dari server.
- Belum ada state global untuk preferensi aksesibilitas (yang seharusnya mengubah seluruh tampilan).
- Battle belum punya alur matchmaking real-time (polling/websocket).

### 3.4 Kelengkapan Desain vs Implementasi
Beberapa state yang diminta di brief **belum punya halaman** (walau sebagian desainnya ada):

**Modul Battle** (brief minta ~10 state, desain tersedia 6, halaman dibuat 3):
| State diminta | Desain tersedia? | Halaman dibuat? |
|---|---|---|
| Mencari lawan | ✅ `mencari_lawan_battle` | ✅ `Battle/Index` |
| Menantang lawan | ✅ `tantang_lawan` | ❌ |
| Loading mencari lawan | ❌ | ❌ |
| Lawan ditemukan | ✅ `lawan_ditemukan` | ❌ |
| Lawan menerima tantangan | ❌ | ❌ |
| Mengerjakan soal | ✅ `pertanyaan_battle_hots` | ✅ `Battle/Play` |
| Kalah | ✅ `hasil_kamu_kalah` | 🟡 `Battle/Result` (gabung) |
| Menang | ✅ `hasil_kamu_menang` | 🟡 `Battle/Result` (gabung) |
| Cek kembali soal | ❌ | ❌ |
| Reveal salah/benar | ❌ | ❌ |

**Modul Leaderboard:** desain `peringkat_top_1_sekolah` ada; brief membedakan *top 1 per bidang*
vs *top 1 sekolah* (dengan poin dari penilaian guru). Halaman `Leaderboard/Index` sudah punya
2 tab, tapi logika sumber poin (guru menilai atau tidak) belum ada.

**Dashboard Admin:** ⚠️ **Tidak ada desain referensi** untuk admin (desain hanya `dashboard_siswa`,
`dashboard_admin_guru`, `dashboard_analitik_ai_guru`). Halaman `Admin/Dashboard` saat ini improvisasi.

**Dashboard Guru:** ada 2 desain (`dashboard_admin_guru` = manajemen, `dashboard_analitik_ai_guru`
= analitik AI/NotebookLLM), tapi baru 1 halaman `Guru/Dashboard` dibuat. Modul "AI Generate
Dashboard" belum dibangun sebagai halaman analitik terpisah.

---

## 4. Revisi / Pembersihan yang Sudah Dilakukan 🧹

- ❌ Dihapus: folder sampah `stitch_.../image.png/` (screenshot yatim tanpa `code.html`).
- 🔧 Dirapikan: struktur folder desain yang bertingkat ganda
  (`stitch_inklusif_belajar_karakter_app/stitch_inklusif_belajar_karakter_app/...`)
  di-flatten menjadi satu level `stitch_inklusif_belajar_karakter_app/...`.
- ❌ Dihapus sebelumnya: `resources/js/app.js` kosong (entry sesungguhnya `app.jsx`),
  `resources/views/welcome.blade.php` bawaan yang tak terpakai.

---

## 5. Rekomendasi Prioritas (Fokus Demo Hackathon)

Untuk demo yang meyakinkan, tidak semua gap perlu dikejar. Prioritas berdasarkan
**dampak visual saat presentasi** vs **usaha**:

### 🔴 Prioritas 1 — Wajib untuk demo kredibel
1. **Perbaiki auth** (B2, B3) — login jalan + `auth.user` dibagikan, agar nama user tampil.
2. **Seeder demo** (B6) — isi kategori forum, badge, soal HOTS, beberapa user, karya, poin,
   agar semua halaman menampilkan data nyata (bukan mock).
3. **Sambungkan 1 fitur AI unggulan** (I1) — moderasi forum ATAU evaluasi P5 yang benar-benar
   memanggil Llama saat demo. Satu yang jalan > lima yang setengah.

### 🟠 Prioritas 2 — Nilai tambah besar, usaha sedang
4. **Filter kata kasar sisi klien** (I4) — cepat dipasang, demо efek instan yang memukau.
5. **Text-to-Speech** (I2) — tombol "dengar" yang benar-benar bersuara (inklusivitas = nilai jual).
6. **Controller CRUD forum & karya** (B1) — minimal buat topik/balasan/karya benar-benar tersimpan.

### 🟡 Prioritas 3 — Jika waktu tersisa
7. Upload R2 untuk Karya-Ku (I3).
8. State battle yang kurang + alur matchmaking (§3.4).
9. Offline sync (I5) — kompleks; untuk demo cukup diceritakan/di-mock.
10. Dashboard analitik AI Guru terpisah + persistensi preferensi aksesibilitas (I7).

Rincian teknis tiap item ada di **[PRD.md](PRD.md)** dan checklist di **[ROADMAP.md](ROADMAP.md)**.
