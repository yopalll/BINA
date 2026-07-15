<?php

namespace Database\Seeders;

use App\Models\Badge;
use App\Models\BattleQuestion;
use App\Models\CharacterPoint;
use App\Models\ForumCategory;
use App\Models\ForumReply;
use App\Models\ForumThread;
use App\Models\Karya;
use App\Models\KaryaReaction;
use App\Models\OfflineContent;
use App\Models\School;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $school = School::create([
            'name' => 'SDN Nusantara 01',
            'npsn' => '20100101',
            'address' => 'Jl. Merdeka No. 1',
            'city' => 'Jakarta',
            'province' => 'DKI Jakarta',
            'is_active' => true,
        ]);

        School::create([
            'name' => 'SD Harapan Bangsa',
            'npsn' => '20100202',
            'city' => 'Bandung',
            'province' => 'Jawa Barat',
            'is_active' => true,
        ]);

        // ── Users ──
        User::create([
            'name' => 'Admin BINA',
            'email' => 'admin@bina.id',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'school_id' => $school->id,
        ]);

        $guru = User::create([
            'name' => 'Bu Rina Wijaya',
            'email' => 'guru@bina.id',
            'password' => Hash::make('password'),
            'role' => 'guru',
            'school_id' => $school->id,
        ]);

        $studentNames = [
            'Siti Nurhaliza', 'Budi Santoso', 'Andi Pratama', 'Dewi Lestari',
            'Rina Kusuma', 'Fajar Nugroho', 'Putri Ayu', 'Rizki Ramadhan',
        ];

        $students = collect($studentNames)->map(function ($name) use ($school) {
            return User::create([
                'name' => $name,
                'email' => Str::slug($name, '.').'@siswa.bina.id',
                'password' => Hash::make('password'),
                'role' => 'siswa',
                'school_id' => $school->id,
                'total_character_points' => random_int(120, 1500),
            ]);
        });

        $siti = $students->first();
        $siti->update(['email' => 'siswa@bina.id']);

        // ── Forum categories ──
        $categories = [
            ['name' => 'Matematika', 'icon' => '📐', 'color' => '#5fb7b9'],
            ['name' => 'Bahasa Indonesia', 'icon' => '📖', 'color' => '#e8914f'],
            ['name' => 'IPA', 'icon' => '🔬', 'color' => '#316768'],
            ['name' => 'IPS', 'icon' => '🌍', 'color' => '#924c0d'],
            ['name' => 'Pendidikan Pancasila', 'icon' => '🇮🇩', 'color' => '#ba1a1a'],
            ['name' => 'Bahasa Inggris', 'icon' => '🗣️', 'color' => '#00696b'],
        ];

        $catModels = collect($categories)->map(function ($c, $i) {
            return ForumCategory::create([
                'name' => $c['name'],
                'slug' => Str::slug($c['name']),
                'icon' => $c['icon'],
                'color' => $c['color'],
                'description' => "Diskusi seputar {$c['name']}",
                'sort_order' => $i,
            ]);
        });

        // ── Forum threads + replies ──
        $threadSeeds = [
            ['Cara mudah memahami pecahan campuran', 'Aku masih bingung membedakan pecahan biasa dan campuran, ada yang bisa bantu?'],
            ['Tips menulis puisi yang menyentuh hati', 'Bagaimana caranya membuat puisi yang bagus untuk tugas Bahasa Indonesia?'],
            ['Eksperimen sains sederhana di rumah', 'Yuk berbagi eksperimen IPA yang bisa dilakukan di rumah!'],
        ];

        foreach ($threadSeeds as $idx => [$title, $body]) {
            $thread = ForumThread::create([
                'forum_category_id' => $catModels[$idx]->id,
                'user_id' => $students->random()->id,
                'title' => $title,
                'body' => $body,
                'reply_count' => 2,
                'last_activity_at' => now()->subHours($idx + 1),
            ]);

            ForumReply::create([
                'forum_thread_id' => $thread->id,
                'user_id' => $students->random()->id,
                'body' => 'Menurutku coba pakai gambar biar lebih gampang dipahami!',
                'reactions' => ['👍' => 3, '❤️' => 1],
            ]);
            ForumReply::create([
                'forum_thread_id' => $thread->id,
                'user_id' => $guru->id,
                'body' => 'Bagus sekali diskusinya. Ibu tambahkan ya: latihan rutin akan sangat membantu.',
                'reactions' => ['👍' => 5, '🎉' => 2],
            ]);
        }

        // ── Battle questions (HOTS) ──
        $questions = [
            [
                'subject' => 'Pendidikan Pancasila',
                'scenario' => 'Kamu menerima pesan broadcast tak dikenal: "Ada penculikan anak di depan sekolah, sebarkan ke semua!". Pesan tidak menyebut sumber jelas.',
                'question' => 'Apa tindakan paling bijak yang harus kamu lakukan?',
                'options' => [
                    ['id' => 'a', 'text' => 'Langsung menyebarkan ke semua grup agar semua waspada'],
                    ['id' => 'b', 'text' => 'Memverifikasi ke guru/orang tua sebelum percaya atau menyebarkan'],
                    ['id' => 'c', 'text' => 'Mengabaikan tapi tetap takut sendiri'],
                    ['id' => 'd', 'text' => 'Membalas pesan dengan marah'],
                ],
                'correct_option_id' => 'b',
                'explanation' => 'Informasi tanpa sumber jelas harus diverifikasi dulu. Menyebarkan hoaks bisa menimbulkan kepanikan.',
                'p5_dimension' => 'Bernalar Kritis',
            ],
            [
                'subject' => 'IPA',
                'scenario' => 'Kamu melihat teman membuang sampah plastik ke sungai kecil dekat sekolah.',
                'question' => 'Respons yang paling menunjukkan karakter Pelajar Pancasila adalah?',
                'options' => [
                    ['id' => 'a', 'text' => 'Ikut membuang karena semua juga begitu'],
                    ['id' => 'b', 'text' => 'Diam saja, bukan urusanku'],
                    ['id' => 'c', 'text' => 'Menegur dengan sopan dan mengajak membuang ke tempat sampah'],
                    ['id' => 'd', 'text' => 'Memfoto lalu menyebarkan untuk mempermalukannya'],
                ],
                'correct_option_id' => 'c',
                'explanation' => 'Menegur dengan sopan menunjukkan kepedulian lingkungan tanpa merendahkan orang lain.',
                'p5_dimension' => 'Gotong Royong',
            ],
            [
                'subject' => 'Matematika',
                'scenario' => 'Sebuah toko memberi diskon 20% lalu tambahan 10% dari harga setelah diskon pertama untuk barang Rp100.000.',
                'question' => 'Berapa harga akhir yang harus dibayar?',
                'options' => [
                    ['id' => 'a', 'text' => 'Rp70.000'],
                    ['id' => 'b', 'text' => 'Rp72.000'],
                    ['id' => 'c', 'text' => 'Rp68.000'],
                    ['id' => 'd', 'text' => 'Rp75.000'],
                ],
                'correct_option_id' => 'b',
                'explanation' => '100.000 × 0,8 = 80.000, lalu 80.000 × 0,9 = 72.000.',
                'p5_dimension' => 'Bernalar Kritis',
            ],
            [
                'subject' => 'Bahasa Indonesia',
                'scenario' => 'Di forum kelas, seorang teman salah menjawab dan ditertawakan siswa lain.',
                'question' => 'Sikap terbaik yang kamu tunjukkan?',
                'options' => [
                    ['id' => 'a', 'text' => 'Ikut menertawakan'],
                    ['id' => 'b', 'text' => 'Membela dan menyemangati temanmu untuk mencoba lagi'],
                    ['id' => 'c', 'text' => 'Diam saja'],
                    ['id' => 'd', 'text' => 'Meninggalkan forum'],
                ],
                'correct_option_id' => 'b',
                'explanation' => 'Empati dan dukungan menciptakan ruang belajar yang aman.',
                'p5_dimension' => 'Berkebinekaan Global',
            ],
            [
                'subject' => 'IPS',
                'scenario' => 'Kelompokmu harus membuat proyek, tetapi satu anggota tidak pernah ikut mengerjakan.',
                'question' => 'Langkah paling bijak?',
                'options' => [
                    ['id' => 'a', 'text' => 'Melaporkan agar dia dihukum'],
                    ['id' => 'b', 'text' => 'Mengerjakan sendiri semua dan mengabaikannya'],
                    ['id' => 'c', 'text' => 'Mengajak bicara baik-baik untuk mencari tahu kendalanya dan membagi tugas'],
                    ['id' => 'd', 'text' => 'Mengeluarkan dia dari kelompok'],
                ],
                'correct_option_id' => 'c',
                'explanation' => 'Komunikasi dan gotong royong menyelesaikan masalah lebih baik daripada menghakimi.',
                'p5_dimension' => 'Gotong Royong',
            ],
        ];

        foreach ($questions as $q) {
            BattleQuestion::create($q);
        }

        // ── Badges ──
        $badges = [
            ['name' => 'Duta Anti-Hoaks', 'icon' => '🛡️', 'criteria_type' => 'battle_wins', 'criteria_value' => 5, 'p5_dimension' => 'Bernalar Kritis'],
            ['name' => 'Pahlawan Lingkungan', 'icon' => '🌱', 'criteria_type' => 'karya_count', 'criteria_value' => 3, 'p5_dimension' => 'Gotong Royong'],
            ['name' => 'Siswa Paling Empati', 'icon' => '💖', 'criteria_type' => 'points_threshold', 'criteria_value' => 500, 'p5_dimension' => 'Berkebinekaan Global'],
        ];

        $badgeModels = collect($badges)->map(fn ($b) => Badge::create([
            'name' => $b['name'],
            'slug' => Str::slug($b['name']),
            'description' => "Lencana {$b['name']}",
            'icon' => $b['icon'],
            'criteria_type' => $b['criteria_type'],
            'criteria_value' => $b['criteria_value'],
            'p5_dimension' => $b['p5_dimension'],
        ]));

        $siti->badges()->attach($badgeModels->pluck('id'), ['earned_at' => now()]);

        // ── Karya (approved + pending) ──
        $karyaSeeds = [
            ['Menegur Penyebar Hoaks', 'aksi', 'approved', 'Aku mengingatkan teman agar cek fakta dulu sebelum share.', 60],
            ['Puisi untuk Ibu Pertiwi', 'puisi', 'approved', 'Tanah airku, tempatku belajar dan tumbuh...', 40],
            ['Membersihkan Selokan Bersama', 'aksi', 'approved', 'Kerja bakti membersihkan selokan depan rumah.', 55],
            ['Gambar Pemandangan Desa', 'gambar', 'pending', null, 0],
        ];

        foreach ($karyaSeeds as [$title, $type, $status, $content, $points]) {
            $karya = Karya::create([
                'user_id' => $students->random()->id,
                'title' => $title,
                'description' => $content ? Str::limit($content, 60) : 'Karya siswa',
                'type' => $type,
                'content' => $content,
                'status' => $status,
                'approved_by' => $status === 'approved' ? $guru->id : null,
                'character_points' => $points,
                'peer_approvals' => $status === 'approved' ? 3 : 1,
            ]);

            foreach (['👍', '❤️', '🎉'] as $emoji) {
                KaryaReaction::create([
                    'karya_id' => $karya->id,
                    'user_id' => $students->random()->id,
                    'emoji' => $emoji,
                ]);
            }
        }

        // ── Character points (spread across P5 dimensions for leaderboard) ──
        $dimensions = ['Bernalar Kritis', 'Gotong Royong', 'Berkebinekaan Global', 'Kreatif', 'Mandiri', 'Beriman'];
        foreach ($students as $student) {
            foreach (collect($dimensions)->random(3) as $dim) {
                CharacterPoint::create([
                    'user_id' => $student->id,
                    'points' => random_int(20, 200),
                    'source_type' => collect(['karya', 'battle', 'forum', 'teacher_assessment'])->random(),
                    'p5_dimension' => $dim,
                    'description' => "Poin dimensi {$dim}",
                    'awarded_by' => $guru->id,
                ]);
            }
        }

        // ── Offline content catalogue ──
        $offlineSeeds = [
            ['Modul Literasi Kelas 5', 'materi', 'Bahasa Indonesia', 2400],
            ['Rangkuman IPA: Ekosistem', 'materi', 'IPA', 1800],
            ['Bank Soal HOTS Matematika', 'kuis', 'Matematika', 950],
            ['Topik Forum: Pancasila', 'forum', 'Pendidikan Pancasila', 640],
        ];
        foreach ($offlineSeeds as [$t, $type, $subj, $size]) {
            OfflineContent::create([
                'title' => $t,
                'type' => $type,
                'subject' => $subj,
                'file_size_kb' => $size,
                'checksum' => Str::random(16),
                'version' => 1,
            ]);
        }
    }
}
