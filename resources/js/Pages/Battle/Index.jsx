import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useState } from 'react';

const BATTLE_MODES = [
    { id: 'quick', icon: '⚡', name: 'Battle Cepat', desc: '5 soal, 30 detik/soal', color: '#e8914f' },
    { id: 'ranked', icon: '🏆', name: 'Battle Peringkat', desc: '10 soal, poin rangking', color: '#00696b' },
    { id: 'friendly', icon: '🤝', name: 'Battle Teman', desc: 'Tantang temanmu!', color: '#316768' },
];

const ONLINE_PLAYERS = [
    { id: 1, name: 'Sari Andriani', avatar: '👩‍🎓', level: 12, wins: 45, rank: 'Petarung Kritis' },
    { id: 2, name: 'Andi Pratama', avatar: '🧑‍🔬', level: 10, wins: 38, rank: 'Penalar Handal' },
    { id: 3, name: 'Dewi Lestari', avatar: '👩‍🎨', level: 15, wins: 62, rank: 'Master HOTS' },
    { id: 4, name: 'Rina Kusuma', avatar: '👧', level: 8, wins: 24, rank: 'Petualang Logis' },
];

export default function BattleIndex() {
    const [selectedMode, setSelectedMode] = useState(null);

    return (
        <AppLayout title="Battle HOTS">
            <Head title="Battle HOTS" />

            {/* Header */}
            <div
                style={{
                    background: 'linear-gradient(135deg, #1a1c1e 0%, #2f3133 50%, #00696b 100%)',
                    borderRadius: 'var(--rounded-lg)',
                    padding: 'var(--space-xl)',
                    color: 'white',
                    marginBottom: 'var(--space-lg)',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div style={{ position: 'absolute', top: -30, left: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(95,183,185,0.1)' }} />
                <div style={{ position: 'absolute', bottom: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(232,145,79,0.08)' }} />
                <div style={{ fontSize: 48, marginBottom: 'var(--space-sm)' }}>⚔️</div>
                <h2 style={{ fontSize: 28, fontWeight: 700 }}>Simulasi Battle HOTS</h2>
                <p style={{ fontSize: 15, opacity: 0.8, marginTop: 8, maxWidth: 500, margin: '8px auto 0' }}>
                    Uji kemampuan bernalar kritismu dengan soal-soal berbasis skenario dunia nyata!
                </p>
            </div>

            {/* Battle Modes */}
            <h3 className="text-headline-md" style={{ marginBottom: 'var(--space-base)' }}>Pilih Mode Battle</h3>
            <div className="grid grid-cols-3" style={{ gap: 'var(--space-base)', marginBottom: 'var(--space-xl)' }}>
                {BATTLE_MODES.map((mode) => (
                    <button
                        key={mode.id}
                        className="card card-elevated"
                        onClick={() => setSelectedMode(mode.id)}
                        style={{
                            textAlign: 'center',
                            cursor: 'pointer',
                            border: selectedMode === mode.id ? `2px solid ${mode.color}` : undefined,
                            background: selectedMode === mode.id ? mode.color + '10' : undefined,
                            transition: 'all var(--transition-fast)',
                        }}
                    >
                        <div style={{ fontSize: 40, marginBottom: 'var(--space-sm)' }}>{mode.icon}</div>
                        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{mode.name}</div>
                        <div style={{ fontSize: 13, color: 'var(--color-outline)' }}>{mode.desc}</div>
                    </button>
                ))}
            </div>

            {/* Online Players */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-base)' }}>
                <h3 className="text-headline-md">Pemain Online 🟢</h3>
                <button className="btn btn-primary btn-lg" disabled={!selectedMode}>
                    🔍 Cari Lawan Acak
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {ONLINE_PLAYERS.map((player) => (
                    <div
                        key={player.id}
                        className="card"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-base)',
                            padding: 'var(--space-base) var(--space-lg)',
                        }}
                    >
                        <span style={{ fontSize: 32 }}>{player.avatar}</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: 15 }}>{player.name}</div>
                            <div style={{ fontSize: 13, color: 'var(--color-outline)' }}>
                                Level {player.level} • {player.wins} menang • {player.rank}
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2d7a2d', display: 'inline-block' }} />
                            <button className="btn btn-outline btn-sm">Tantang</button>
                        </div>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
