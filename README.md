# BINA — Belajar Inklusif, Nalar & Aksi

BINA adalah platform pembelajaran digital yang memadukan literasi akademik dengan
pembentukan karakter Profil Pelajar Pancasila (P5). Selain modul belajar konvensional,
BINA memberi ruang bagi siswa untuk berdiskusi secara aman, mendokumentasikan aksi nyata
sehari-hari, berlatih bernalar kritis lewat simulasi berbasis skenario, dan mengakses semua
materi secara inklusif (termasuk lewat suara) — termasuk untuk daerah dengan koneksi
internet terbatas (3T).

## Tumpukan Teknologi (Tech Stack)

| Lapisan | Teknologi | Fungsi |
|---|---|---|
| Backend | Laravel 13 (PHP 8.3+) | Routing, autentikasi, ORM, queue/jobs untuk pemanggilan API eksternal secara asinkron |
| Frontend / Jembatan Data | React 19 + Inertia.js | SPA tanpa REST API terpisah — React menangani interaktivitas & rendering |
| AI Utama | Meta-Llama-3.1-8B-Instruct (via endpoint kompatibel OpenAI, mis. Groq) | Evaluasi karakter P5 otomatis dari Jurnal Aksi & forum, serta moderasi lapis kedua (deteksi agresi pasif/cyberbullying) |
| Text-to-Speech | Microsoft Azure AI Speech (voice `id-ID-GadisNeural`) | Mengubah materi, forum, dan karya menjadi audio untuk aksesibilitas |
| Filter Toksisitas Sisi Klien | `indonesian-badwords` (npm) | Filter kata kasar & leetspeak secara instan di state input React, sebelum request dikirim ke server |
| Object Storage | Cloudflare R2 (S3-compatible) | Penyimpanan media resolusi tinggi modul Karya-Ku, zero egress fee |
| Database | MySQL 8 (utf8mb4 / `utf8mb4_0900_ai_ci`) | Lihat catatan kolasi di bawah |

> **Catatan kolasi database:** kolom `ENUM` yang berisi emoji (mis. reaksi 👍❤️🎉 di
> `karya_reactions`) memakai `utf8mb4_0900_ai_ci`, bukan `utf8mb4_unicode_ci`. Kolasi lama
> (`utf8mb4_unicode_ci` / `utf8mb4_general_ci`) tidak mendukung karakter di luar Basic
> Multilingual Plane dengan benar, sehingga emoji seperti 👍 dan 🎉 dianggap identik oleh
> MySQL dan migrasi `ENUM` akan gagal dengan error *"duplicated value '?'"*.

## Modul Produk

1. **Belajar Bareng** — forum diskusi per mata pelajaran dengan moderasi AI otomatis dan
   balas suara. Dua tampilan: pencarian forum (`/forum`) dan ruang diskusi (`/forum/{thread}`).
2. **Karya-Ku** — galeri karya siswa dan jurnal aksi nyata dengan validasi silang
   (teman/guru) untuk Poin Karakter, tanpa kolom komentar bebas (`/karya`).
3. **Dengar dan Baca** — TTS terintegrasi, kontrol kecepatan/suara, mode kontras tinggi,
   dan skala teks fleksibel (`/aksesibilitas`).
4. **Simulasi Battle HOTS** — roleplay skenario kritis dengan tekanan waktu
   (`/battle`, `/battle/play`, `/battle/result`).
5. **Offline Sync** — unduh materi sekali saat online, rekam aktivitas secara lokal, dan
   sinkronisasi otomatis saat kembali online (`/offline`).
6. **AI Generate Dashboard** — dasbor analitik guru berbasis analisis sentimen jurnal &
   forum, dipetakan ke dimensi P5 (`/guru/dashboard`).
7. **Leaderboard Karakter** — peringkat berbasis Poin Karakter (bukan nilai ujian), dengan
   gelar & lencana digital (`/leaderboard`).
8. **Dashboard Siswa** (`/`), **Dashboard Guru** (`/guru/dashboard`), dan
   **Dashboard Admin** (`/admin/dashboard`).

Referensi desain visual (hasil ekspor Stitch) tersedia di
[`stitch_inklusif_belajar_karakter_app/`](stitch_inklusif_belajar_karakter_app) — setiap
folder berisi `code.html` dan `screen.png` per state layar. Token warna & tipografi pada
`resources/css/app.css` diturunkan dari `bina_vibrant_learning/DESIGN.md` di folder yang sama.

## Struktur Proyek

```
app/Models/           Entitas domain: School, ForumThread/Reply, Karya, BattleMatch/Question,
                       CharacterPoint, Badge, OfflineContent, dll.
database/migrations/   Skema relasional untuk seluruh modul di atas.
resources/js/Pages/    Satu komponen React per halaman Inertia (Forum, Karya, Battle,
                       Leaderboard, Aksesibilitas, Offline, Admin, Guru, Auth).
resources/js/Layouts/  AppLayout.jsx — shell navigasi bersama (sidebar + top bar).
routes/web.php         Pemetaan route -> halaman Inertia.
config/filesystems.php Disk `r2` (Cloudflare R2, S3-compatible) untuk media Karya-Ku.
config/services.php    Kredensial `llama` (Meta-Llama-3.1-8B-Instruct) dan `azure_speech`.
```

Halaman-halaman ini saat ini merender data contoh (mock) agar seluruh alur UI dapat
didemokan tanpa bergantung pada backend penuh; controller dan endpoint data akan
menggantikan data mock ini secara bertahap.

## Instalasi

### Prasyarat
- PHP >= 8.3 dengan ekstensi `pdo_mysql`
- Composer 2.x
- Node.js >= 20 & npm
- MySQL 8 yang sudah berjalan

### Langkah setup

```bash
git clone https://github.com/yopalll/BINA.git
cd BINA

composer install
npm install

cp .env.example .env
php artisan key:generate
```

Buat database dan sesuaikan kredensial MySQL di `.env` (`DB_DATABASE`, `DB_USERNAME`,
`DB_PASSWORD`), lalu:

```bash
php artisan migrate
php artisan db:seed
```

Isi juga variabel layanan eksternal di `.env` sesuai kebutuhan (opsional untuk menjalankan
UI secara lokal, wajib untuk fitur AI/TTS/storage yang sesungguhnya):

```
LLAMA_API_KEY=          # Meta-Llama-3.1-8B-Instruct (mis. Groq API)
AZURE_SPEECH_KEY=       # Microsoft Azure AI Speech
AZURE_SPEECH_REGION=
R2_ACCESS_KEY_ID=       # Cloudflare R2
R2_SECRET_ACCESS_KEY=
R2_BUCKET=
R2_ENDPOINT=
```

### Menjalankan proyek

```bash
composer dev
```

Perintah ini menjalankan `php artisan serve`, queue listener, log viewer (`pail`), dan
Vite dev server secara bersamaan. Aplikasi tersedia di `http://localhost:8000`.

### Build produksi

```bash
npm run build
```

## Testing

```bash
composer test
```

## Lisensi

Proyek internal — belum dipublikasikan di bawah lisensi terbuka.
