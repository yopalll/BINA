import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useState } from 'react';

const AVATARS = ['👩‍🎨', '🧑‍🔬', '👩‍🎓', '🧑‍🎓', '👧', '👦', '👩‍💼', '🧑‍💻'];
const DIM_ICONS = {
    'Bernalar Kritis': '🧠', 'Gotong Royong': '🤝', 'Berkebinekaan Global': '🌍',
    'Kreatif': '🎨', 'Mandiri': '🦅', 'Beriman': '🙏',
};
const DIM_COLORS = ['#5fb7b9', '#e8914f', '#316768', '#ba1a1a', '#924c0d', '#00696b'];

function Podium({ student, place, avatar }) {
    const cfg = {
        1: { h: 140, bg: 'linear-gradient(180deg, #FFD700, #fea360)', medal: '🥇', size: 48, shadow: '0 8px 32px rgba(255,215,0,0.3)' },
        2: { h: 100, bg: 'linear-gradient(180deg, #C0C0C0, #e2e2e5)', medal: '🥈', size: 40, shadow: 'none' },
        3: { h: 80, bg: 'linear-gradient(180deg, #CD7F32, #e8c4a0)', medal: '🥉', size: 40, shadow: 'none' },
    }[place];

    return (
        <div style={{ textAlign: 'center', flex: 1, maxWidth: place === 1 ? 220 : 200 }}>
            <div style={{ fontSize: cfg.size, marginBottom: 'var(--space-sm)' }}>{avatar}</div>
            <div style={{ fontWeight: place === 1 ? 700 : 600, fontSize: place === 1 ? 16 : 14 }}>{student.name}</div>
            <div style={{ fontWeight: 700, fontSize: place === 1 ? 24 : 20, color: place === 1 ? 'var(--color-secondary)' : 'var(--color-outline)' }}>{student.points.toLocaleString('id-ID')}</div>
            <div style={{ height: cfg.h, background: cfg.bg, borderRadius: 'var(--rounded) var(--rounded) 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: place === 1 ? 40 : 28, marginTop: 'var(--space-sm)', boxShadow: cfg.shadow }}>
                {cfg.medal}
            </div>
        </div>
    );
}

export default function LeaderboardIndex({ schoolRanking = [], subjectRanking = [], currentUserId }) {
    const [tab, setTab] = useState('sekolah');
    const [first, second, third] = schoolRanking;

    return (
        <AppLayout title="Leaderboard">
            <Head title="Leaderboard Karakter" />

            <h2 className="text-headline-lg" style={{ marginBottom: 'var(--space-xs)' }}>Leaderboard Karakter 🏆</h2>
            <p className="text-body-md" style={{ color: 'var(--color-outline)', marginBottom: 'var(--space-lg)' }}>
                Peringkat 100% dari Poin Karakter — bukan nilai ujian.
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
                {[{ id: 'sekolah', label: '🏫 Top Sekolah' }, { id: 'bidang', label: '📐 Top per Bidang' }].map((t) => (
                    <button key={t.id} className="chip" onClick={() => setTab(t.id)} style={{ cursor: 'pointer', padding: '10px 20px', fontSize: 14, background: tab === t.id ? 'var(--color-primary)' : 'var(--color-surface-container)', color: tab === t.id ? 'var(--color-on-primary)' : 'var(--color-on-surface-variant)' }}>
                        {t.label}
                    </button>
                ))}
            </div>

            {tab === 'sekolah' && (
                <>
                    {schoolRanking.length === 0 && <p style={{ color: 'var(--color-outline)' }}>Belum ada data peringkat.</p>}
                    {schoolRanking.length > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 'var(--space-base)', marginBottom: 'var(--space-xl)' }}>
                            {second && <Podium student={second} place={2} avatar={AVATARS[1]} />}
                            {first && <Podium student={first} place={1} avatar={AVATARS[0]} />}
                            {third && <Podium student={third} place={3} avatar={AVATARS[2]} />}
                        </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                        {schoolRanking.slice(3).map((student, i) => (
                            <div key={student.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-base)', padding: 'var(--space-base) var(--space-lg)', border: student.id === currentUserId ? '2px solid var(--color-primary)' : undefined }}>
                                <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--color-outline)', width: 30, textAlign: 'center' }}>{student.rank}</div>
                                <span style={{ fontSize: 28 }}>{AVATARS[(i + 3) % AVATARS.length]}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: 14 }}>{student.name}{student.id === currentUserId ? ' (Kamu)' : ''}</div>
                                </div>
                                <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--color-primary)' }}>{student.points.toLocaleString('id-ID')} pts</div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {tab === 'bidang' && (
                <div className="grid grid-cols-2" style={{ gap: 'var(--space-base)' }}>
                    {subjectRanking.length === 0 && <p style={{ color: 'var(--color-outline)' }}>Belum ada data per bidang.</p>}
                    {subjectRanking.map((item, i) => (
                        <div key={item.dimension} className="card card-elevated" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: DIM_COLORS[i % DIM_COLORS.length] }} />
                            <div style={{ fontSize: 40, marginBottom: 'var(--space-sm)' }}>{DIM_ICONS[item.dimension] || '⭐'}</div>
                            <div className="text-label-md" style={{ color: 'var(--color-outline)', marginBottom: 'var(--space-base)' }}>Top 1 {item.dimension}</div>
                            <div style={{ fontSize: 48, marginBottom: 'var(--space-sm)' }}>{AVATARS[i % AVATARS.length]}</div>
                            <div style={{ fontWeight: 700, fontSize: 16 }}>{item.leader}</div>
                            <div style={{ fontWeight: 700, fontSize: 22, color: DIM_COLORS[i % DIM_COLORS.length], marginTop: 4 }}>{item.points} pts</div>
                            <div className="chip" style={{ marginTop: 'var(--space-md)', background: '#FFD70030', color: '#b36b00' }}>🥇 Juara 1</div>
                        </div>
                    ))}
                </div>
            )}
        </AppLayout>
    );
}
