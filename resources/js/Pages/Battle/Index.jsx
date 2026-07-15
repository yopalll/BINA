import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useState, useEffect } from 'react';

const BATTLE_MODES = [
    { id: 'quick', icon: '⚡', name: 'Battle Cepat', desc: '5 soal, 30 detik/soal', color: '#e8914f' },
    { id: 'ranked', icon: '🏆', name: 'Battle Peringkat', desc: '10 soal, poin rangking', color: '#00696b' },
    { id: 'friendly', icon: '🤝', name: 'Battle Teman', desc: 'Tantang temanmu!', color: '#316768' },
];

const AVATARS = ['👩‍🎓', '🧑‍🔬', '👩‍🎨', '👧', '👦', '🧑‍🎓'];

/** Matchmaking overlay: searching (loading) → found → starts the battle. */
function Matchmaking({ opponent, onCancel }) {
    const [phase, setPhase] = useState('searching'); // searching | found

    useEffect(() => {
        const t1 = setTimeout(() => setPhase('found'), 2200);
        const t2 = setTimeout(() => router.visit(`/battle/play?opponent=${encodeURIComponent(opponent.name)}`), 4200);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [opponent]);

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(135deg, #1a1c1e, #00696b)', zIndex: 95, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', gap: 'var(--space-lg)', padding: 'var(--space-lg)', textAlign: 'center' }}>
            {phase === 'searching' ? (
                <>
                    <div className="animate-spin" style={{ fontSize: 64 }}>⚔️</div>
                    <h2 style={{ fontSize: 26, fontWeight: 700 }}>Mencari lawan...</h2>
                    <p style={{ opacity: 0.8 }}>Menyiapkan pertandingan yang seimbang untukmu</p>
                    <div className="animate-pulse" style={{ display: 'flex', gap: 8 }}>
                        {[0, 1, 2].map((i) => <span key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: 'white' }} />)}
                    </div>
                </>
            ) : (
                <>
                    <div style={{ fontSize: 20, opacity: 0.8, letterSpacing: 2 }}>LAWAN DITEMUKAN!</div>
                    <div className="animate-slide-up" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xl)' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 64 }}>🧑‍🎓</div>
                            <div style={{ fontWeight: 700, marginTop: 8 }}>Kamu</div>
                        </div>
                        <div style={{ fontSize: 40, fontWeight: 800, color: 'var(--color-accent-orange)' }}>VS</div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 64 }}>{opponent.avatar}</div>
                            <div style={{ fontWeight: 700, marginTop: 8 }}>{opponent.name}</div>
                        </div>
                    </div>
                    <p style={{ opacity: 0.8 }}>Bersiaplah! Pertandingan dimulai...</p>
                </>
            )}
            <button className="btn btn-ghost" style={{ color: 'white', marginTop: 'var(--space-lg)' }} onClick={onCancel}>Batalkan</button>
        </div>
    );
}

export default function BattleIndex({ opponents = [] }) {
    const [selectedMode, setSelectedMode] = useState('quick');
    const [matchOpponent, setMatchOpponent] = useState(null);

    const challenge = (opp) => setMatchOpponent(opp);
    const findRandom = () => {
        const pool = opponents.length ? opponents : [{ name: 'Lawan Acak', avatar: '🤖' }];
        setMatchOpponent({ ...pool[Math.floor(Math.random() * pool.length)] });
    };

    return (
        <AppLayout title="Battle HOTS">
            <Head title="Battle HOTS" />

            <div style={{ background: 'linear-gradient(135deg, #1a1c1e 0%, #2f3133 50%, #00696b 100%)', borderRadius: 'var(--rounded-lg)', padding: 'var(--space-xl)', color: 'white', marginBottom: 'var(--space-lg)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, left: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(95,183,185,0.1)' }} />
                <div style={{ position: 'absolute', bottom: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(232,145,79,0.08)' }} />
                <div style={{ fontSize: 48, marginBottom: 'var(--space-sm)' }}>⚔️</div>
                <h2 style={{ fontSize: 28, fontWeight: 700 }}>Simulasi Battle HOTS</h2>
                <p style={{ fontSize: 15, opacity: 0.8, marginTop: 8, maxWidth: 500, margin: '8px auto 0' }}>
                    Uji kemampuan bernalar kritismu dengan soal-soal berbasis skenario dunia nyata!
                </p>
            </div>

            <h3 className="text-headline-md" style={{ marginBottom: 'var(--space-base)' }}>Pilih Mode Battle</h3>
            <div className="grid grid-cols-3" style={{ gap: 'var(--space-base)', marginBottom: 'var(--space-xl)' }}>
                {BATTLE_MODES.map((mode) => (
                    <button key={mode.id} className="card card-elevated" onClick={() => setSelectedMode(mode.id)} style={{ textAlign: 'center', cursor: 'pointer', border: selectedMode === mode.id ? `2px solid ${mode.color}` : undefined, background: selectedMode === mode.id ? mode.color + '10' : undefined }}>
                        <div style={{ fontSize: 40, marginBottom: 'var(--space-sm)' }}>{mode.icon}</div>
                        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{mode.name}</div>
                        <div style={{ fontSize: 13, color: 'var(--color-outline)' }}>{mode.desc}</div>
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-base)', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
                <h3 className="text-headline-md">Pemain Online 🟢</h3>
                <button className="btn btn-primary btn-lg" disabled={!selectedMode} onClick={findRandom}>🔍 Cari Lawan Acak</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {opponents.length === 0 && <p style={{ color: 'var(--color-outline)', fontSize: 14 }}>Belum ada pemain lain. Coba "Cari Lawan Acak"!</p>}
                {opponents.map((player, i) => (
                    <div key={player.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-base)', padding: 'var(--space-base) var(--space-lg)' }}>
                        <span style={{ fontSize: 32 }}>{AVATARS[i % AVATARS.length]}</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: 15 }}>{player.name}</div>
                            <div style={{ fontSize: 13, color: 'var(--color-outline)' }}>{(player.points ?? 0).toLocaleString('id-ID')} Poin Karakter</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2d7a2d', display: 'inline-block' }} />
                            <button className="btn btn-outline btn-sm" onClick={() => challenge({ name: player.name, avatar: AVATARS[i % AVATARS.length] })}>Tantang</button>
                        </div>
                    </div>
                ))}
            </div>

            {matchOpponent && <Matchmaking opponent={matchOpponent} onCancel={() => setMatchOpponent(null)} />}
        </AppLayout>
    );
}
