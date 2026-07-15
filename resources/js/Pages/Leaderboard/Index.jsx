import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useState } from 'react';

const TOP_STUDENTS = [
    { rank: 1, name: 'Dewi Lestari', avatar: '👩‍🎨', points: 2847, badges: ['🦸 Duta Anti-Hoaks', '🌿 Pahlawan Lingkungan'], school: 'SDN 1 Jakarta' },
    { rank: 2, name: 'Andi Pratama', avatar: '🧑‍🔬', points: 2654, badges: ['🤝 Siswa Paling Empati'], school: 'SDN 1 Jakarta' },
    { rank: 3, name: 'Sari Andriani', avatar: '👩‍🎓', points: 2498, badges: ['📚 Kutu Buku Sejati'], school: 'SDN 1 Jakarta' },
    { rank: 4, name: 'Budi Santoso', avatar: '🧑‍🎓', points: 2210, badges: ['⚔️ Petarung Kritis'], school: 'SDN 1 Jakarta' },
    { rank: 5, name: 'Rina Kusuma', avatar: '👧', points: 2105, badges: ['❤️ Sahabat Sejati'], school: 'SDN 1 Jakarta' },
    { rank: 6, name: 'Fajar Maulana', avatar: '🧑‍💻', points: 1987, badges: [], school: 'SDN 1 Jakarta' },
    { rank: 7, name: 'Putri Handayani', avatar: '👩‍💼', points: 1854, badges: ['🎨 Seniman Muda'], school: 'SDN 1 Jakarta' },
    { rank: 8, name: 'Rizky Wijaya', avatar: '🧑‍🏫', points: 1742, badges: [], school: 'SDN 1 Jakarta' },
];

const SUBJECT_LEADERS = [
    { subject: 'Matematika', icon: '📐', leader: 'Andi Pratama', avatar: '🧑‍🔬', points: 456, color: '#5fb7b9' },
    { subject: 'Bahasa Indonesia', icon: '📖', leader: 'Sari Andriani', avatar: '👩‍🎓', points: 389, color: '#e8914f' },
    { subject: 'IPA', icon: '🔬', leader: 'Dewi Lestari', avatar: '👩‍🎨', points: 412, color: '#316768' },
    { subject: 'Pendidikan Pancasila', icon: '🇮🇩', leader: 'Budi Santoso', avatar: '🧑‍🎓', points: 378, color: '#ba1a1a' },
];

export default function LeaderboardIndex() {
    const [tab, setTab] = useState('sekolah');

    return (
        <AppLayout title="Leaderboard">
            <Head title="Leaderboard Karakter" />

            <h2 className="text-headline-lg" style={{ marginBottom: 'var(--space-lg)' }}>Leaderboard Karakter 🏆</h2>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
                {[
                    { id: 'sekolah', label: '🏫 Top Sekolah' },
                    { id: 'bidang', label: '📐 Top per Bidang' },
                ].map((t) => (
                    <button
                        key={t.id}
                        className="chip"
                        onClick={() => setTab(t.id)}
                        style={{
                            cursor: 'pointer',
                            padding: '10px 20px',
                            fontSize: 14,
                            background: tab === t.id ? 'var(--color-primary)' : 'var(--color-surface-container)',
                            color: tab === t.id ? 'var(--color-on-primary)' : 'var(--color-on-surface-variant)',
                        }}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {tab === 'sekolah' && (
                <>
                    {/* Top 3 Podium */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 'var(--space-base)', marginBottom: 'var(--space-xl)' }}>
                        {/* 2nd Place */}
                        <div style={{ textAlign: 'center', flex: 1, maxWidth: 200 }}>
                            <div style={{ fontSize: 40, marginBottom: 'var(--space-sm)' }}>{TOP_STUDENTS[1].avatar}</div>
                            <div style={{ fontWeight: 600, fontSize: 14 }}>{TOP_STUDENTS[1].name}</div>
                            <div style={{ fontWeight: 700, fontSize: 20, color: 'var(--color-outline)' }}>{TOP_STUDENTS[1].points.toLocaleString()}</div>
                            <div
                                style={{
                                    height: 100,
                                    background: 'linear-gradient(180deg, #C0C0C0, #e2e2e5)',
                                    borderRadius: 'var(--rounded) var(--rounded) 0 0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 32,
                                    fontWeight: 800,
                                    color: 'white',
                                    marginTop: 'var(--space-sm)',
                                }}
                            >
                                🥈
                            </div>
                        </div>
                        {/* 1st Place */}
                        <div style={{ textAlign: 'center', flex: 1, maxWidth: 220 }}>
                            <div style={{ fontSize: 48, marginBottom: 'var(--space-sm)' }}>{TOP_STUDENTS[0].avatar}</div>
                            <div style={{ fontWeight: 700, fontSize: 16 }}>{TOP_STUDENTS[0].name}</div>
                            <div style={{ fontWeight: 700, fontSize: 24, color: 'var(--color-secondary)' }}>{TOP_STUDENTS[0].points.toLocaleString()}</div>
                            <div
                                style={{
                                    height: 140,
                                    background: 'linear-gradient(180deg, #FFD700, #fea360)',
                                    borderRadius: 'var(--rounded) var(--rounded) 0 0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 40,
                                    fontWeight: 800,
                                    color: 'white',
                                    marginTop: 'var(--space-sm)',
                                    boxShadow: '0 8px 32px rgba(255,215,0,0.3)',
                                }}
                            >
                                🥇
                            </div>
                        </div>
                        {/* 3rd Place */}
                        <div style={{ textAlign: 'center', flex: 1, maxWidth: 200 }}>
                            <div style={{ fontSize: 40, marginBottom: 'var(--space-sm)' }}>{TOP_STUDENTS[2].avatar}</div>
                            <div style={{ fontWeight: 600, fontSize: 14 }}>{TOP_STUDENTS[2].name}</div>
                            <div style={{ fontWeight: 700, fontSize: 20, color: 'var(--color-outline)' }}>{TOP_STUDENTS[2].points.toLocaleString()}</div>
                            <div
                                style={{
                                    height: 80,
                                    background: 'linear-gradient(180deg, #CD7F32, #e8c4a0)',
                                    borderRadius: 'var(--rounded) var(--rounded) 0 0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 28,
                                    fontWeight: 800,
                                    color: 'white',
                                    marginTop: 'var(--space-sm)',
                                }}
                            >
                                🥉
                            </div>
                        </div>
                    </div>

                    {/* Full Ranking */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                        {TOP_STUDENTS.slice(3).map((student) => (
                            <div
                                key={student.rank}
                                className="card"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--space-base)',
                                    padding: 'var(--space-base) var(--space-lg)',
                                }}
                            >
                                <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--color-outline)', width: 30, textAlign: 'center' }}>
                                    {student.rank}
                                </div>
                                <span style={{ fontSize: 28 }}>{student.avatar}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: 14 }}>{student.name}</div>
                                    {student.badges.length > 0 && (
                                        <div style={{ display: 'flex', gap: 'var(--space-xs)', marginTop: 2 }}>
                                            {student.badges.map((b, i) => (
                                                <span key={i} style={{ fontSize: 11, color: 'var(--color-outline)' }}>{b}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--color-primary)' }}>
                                    {student.points.toLocaleString()} pts
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {tab === 'bidang' && (
                <div className="grid grid-cols-2" style={{ gap: 'var(--space-base)' }}>
                    {SUBJECT_LEADERS.map((item) => (
                        <div
                            key={item.subject}
                            className="card card-elevated"
                            style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}
                        >
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: item.color }} />
                            <div style={{ fontSize: 40, marginBottom: 'var(--space-sm)' }}>{item.icon}</div>
                            <div className="text-label-md" style={{ color: 'var(--color-outline)', marginBottom: 'var(--space-base)' }}>
                                Top 1 {item.subject}
                            </div>
                            <div style={{ fontSize: 48, marginBottom: 'var(--space-sm)' }}>{item.avatar}</div>
                            <div style={{ fontWeight: 700, fontSize: 16 }}>{item.leader}</div>
                            <div style={{ fontWeight: 700, fontSize: 22, color: item.color, marginTop: 4 }}>{item.points} pts</div>
                            <div className="chip" style={{ marginTop: 'var(--space-md)', background: '#FFD70030', color: '#b36b00' }}>
                                🥇 Juara 1
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AppLayout>
    );
}
