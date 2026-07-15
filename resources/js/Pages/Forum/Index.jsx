import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const SUBJECTS = [
    { id: 1, name: 'Matematika', icon: '📐', color: '#5fb7b9', threads: 24, members: 156, lastActive: '5 menit lalu' },
    { id: 2, name: 'Bahasa Indonesia', icon: '📖', color: '#e8914f', threads: 31, members: 189, lastActive: '12 menit lalu' },
    { id: 3, name: 'IPA', icon: '🔬', color: '#316768', threads: 18, members: 134, lastActive: '1 jam lalu' },
    { id: 4, name: 'IPS', icon: '🌍', color: '#924c0d', threads: 15, members: 98, lastActive: '2 jam lalu' },
    { id: 5, name: 'Pendidikan Pancasila', icon: '🇮🇩', color: '#ba1a1a', threads: 22, members: 201, lastActive: '30 menit lalu' },
    { id: 6, name: 'Bahasa Inggris', icon: '🗣️', color: '#00696b', threads: 27, members: 145, lastActive: '45 menit lalu' },
    { id: 7, name: 'Seni & Prakarya', icon: '🎨', color: '#7eb3b4', threads: 12, members: 87, lastActive: '3 jam lalu' },
    { id: 8, name: 'PJOK', icon: '⚽', color: '#fea360', threads: 9, members: 76, lastActive: '5 jam lalu' },
];

const TRENDING_THREADS = [
    { id: 1, title: 'Cara mudah memahami pecahan campuran', subject: 'Matematika', replies: 12, author: 'Budi S.', avatar: '🧑‍🎓' },
    { id: 2, title: 'Tips menulis puisi yang menyentuh hati', subject: 'Bahasa Indonesia', replies: 8, author: 'Sari A.', avatar: '👩‍🎓' },
    { id: 3, title: 'Eksperimen sains sederhana di rumah', subject: 'IPA', replies: 15, author: 'Andi R.', avatar: '🧑‍🔬' },
];

export default function ForumIndex() {
    return (
        <AppLayout title="Belajar Bareng">
            <Head title="Belajar Bareng" />

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-lg)' }}>
                <div>
                    <h2 className="text-headline-lg">Forum Belajar Bareng 💬</h2>
                    <p className="text-body-md" style={{ color: 'var(--color-outline)', marginTop: 4 }}>
                        Pilih mata pelajaran dan mulai diskusi bersama teman-temanmu
                    </p>
                </div>
                <button className="btn btn-primary">+ Buat Topik Baru</button>
            </div>

            {/* Search Bar */}
            <div style={{ marginBottom: 'var(--space-lg)' }}>
                <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 20 }}>🔍</span>
                    <input
                        className="input"
                        placeholder="Cari topik diskusi, pertanyaan, atau kata kunci..."
                        style={{ paddingLeft: 48 }}
                    />
                </div>
            </div>

            {/* Subject Grid */}
            <h3 className="text-headline-md" style={{ marginBottom: 'var(--space-base)' }}>Mata Pelajaran</h3>
            <div className="grid grid-cols-4" style={{ gap: 'var(--space-base)', marginBottom: 'var(--space-xl)' }}>
                {SUBJECTS.map((subject) => (
                    <Link
                        key={subject.id}
                        href={`/forum/${subject.id}`}
                        className="card card-elevated"
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: 4,
                                background: subject.color,
                            }}
                        />
                        <div style={{ fontSize: 32, marginBottom: 'var(--space-sm)' }}>{subject.icon}</div>
                        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{subject.name}</div>
                        <div style={{ display: 'flex', gap: 'var(--space-base)', fontSize: 12, color: 'var(--color-outline)' }}>
                            <span>{subject.threads} topik</span>
                            <span>{subject.members} anggota</span>
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--color-outline)', marginTop: 'var(--space-sm)' }}>
                            Aktif {subject.lastActive}
                        </div>
                    </Link>
                ))}
            </div>

            {/* Trending Threads */}
            <h3 className="text-headline-md" style={{ marginBottom: 'var(--space-base)' }}>🔥 Topik Trending</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {TRENDING_THREADS.map((thread) => (
                    <div
                        key={thread.id}
                        className="card"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-base)',
                            padding: 'var(--space-base) var(--space-lg)',
                            cursor: 'pointer',
                        }}
                    >
                        <span style={{ fontSize: 28 }}>{thread.avatar}</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: 15 }}>{thread.title}</div>
                            <div style={{ fontSize: 13, color: 'var(--color-outline)', marginTop: 2 }}>
                                oleh {thread.author} • {thread.subject}
                            </div>
                        </div>
                        <div className="chip">{thread.replies} balasan</div>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
