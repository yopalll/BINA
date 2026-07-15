import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const QUICK_ACTIONS = [
    { icon: '💬', label: 'Belajar Bareng', desc: 'Diskusi & tanya jawab', color: '#5fb7b9', href: '/forum' },
    { icon: '🎨', label: 'Karya-Ku', desc: 'Unggah karya & aksi', color: '#e8914f', href: '/karya' },
    { icon: '⚔️', label: 'Battle HOTS', desc: 'Tantang temanmu!', color: '#ba1a1a', href: '/battle' },
    { icon: '🏆', label: 'Leaderboard', desc: 'Peringkat karakter', color: '#924c0d', href: '/leaderboard' },
];

const ACTIVITY_COLORS = ['#00696b', '#e8914f', '#ba1a1a', '#924c0d', '#5fb7b9'];

function StatCard({ icon, label, value, trend, color }) {
    return (
        <div
            className="card card-elevated"
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-md)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    borderRadius: 'var(--rounded-full)',
                    background: color,
                    opacity: 0.08,
                }}
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 28 }}>{icon}</span>
                {trend && (
                    <span className="chip" style={{ background: '#e6f7f7', color: '#00696b', fontSize: 11 }}>
                        {trend}
                    </span>
                )}
            </div>
            <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-on-surface)' }}>{value}</div>
                <div style={{ fontSize: 13, color: 'var(--color-outline)', marginTop: 2 }}>{label}</div>
            </div>
        </div>
    );
}

export default function Dashboard({ stats, weeklyPoints = 0, recentActivities = [] }) {
    const activities = recentActivities.map((a, i) => ({
        ...a,
        color: ACTIVITY_COLORS[i % ACTIVITY_COLORS.length],
    }));

    return (
        <AppLayout title="Dashboard">
            <Head title="Dashboard" />

            {/* Welcome Section */}
            <div
                style={{
                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-tertiary) 100%)',
                    borderRadius: 'var(--rounded-lg)',
                    padding: 'var(--space-xl)',
                    color: 'white',
                    marginBottom: 'var(--space-lg)',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: -40,
                        right: -40,
                        width: 200,
                        height: 200,
                        borderRadius: 'var(--rounded-full)',
                        background: 'rgba(255,255,255,0.1)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: -60,
                        right: 80,
                        width: 140,
                        height: 140,
                        borderRadius: 'var(--rounded-full)',
                        background: 'rgba(255,255,255,0.06)',
                    }}
                />
                <h2 style={{ fontSize: 28, fontWeight: 700, lineHeight: '36px', position: 'relative' }}>
                    Selamat Datang Kembali! 👋
                </h2>
                <p style={{ fontSize: 16, opacity: 0.9, marginTop: 8, position: 'relative', maxWidth: 500 }}>
                    Mari lanjutkan perjalanan belajar dan membangun karakter bersama.
                    Kamu sudah mengumpulkan <strong>{weeklyPoints} Poin Karakter</strong> minggu ini!
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4" style={{ gap: 'var(--space-base)', marginBottom: 'var(--space-lg)' }}>
                <StatCard icon="⭐" label="Poin Karakter" value={(stats?.character_points ?? 0).toLocaleString('id-ID')} color="#5fb7b9" />
                <StatCard icon="📝" label="Karya Disetujui" value={stats?.approved_karya ?? 0} color="#e8914f" />
                <StatCard icon="⚔️" label="Battle Menang" value={stats?.battle_wins ?? 0} color="#ba1a1a" />
                <StatCard icon="🏅" label="Lencana" value={stats?.badges ?? 0} color="#924c0d" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
                {/* Quick Actions */}
                <div className="card" style={{ padding: 'var(--space-lg)' }}>
                    <h3 className="text-headline-md" style={{ marginBottom: 'var(--space-base)' }}>
                        Aksi Cepat
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                        {QUICK_ACTIONS.map((action) => (
                            <a
                                key={action.label}
                                href={action.href}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--space-md)',
                                    padding: 'var(--space-md)',
                                    borderRadius: 'var(--rounded)',
                                    transition: 'all var(--transition-fast)',
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                    color: 'inherit',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-container)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <div
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 'var(--rounded)',
                                        background: action.color + '18',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 22,
                                        flexShrink: 0,
                                    }}
                                >
                                    {action.icon}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: 14 }}>{action.label}</div>
                                    <div style={{ fontSize: 13, color: 'var(--color-outline)' }}>{action.desc}</div>
                                </div>
                                <span style={{ marginLeft: 'auto', color: 'var(--color-outline)', fontSize: 18 }}>›</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="card" style={{ padding: 'var(--space-lg)' }}>
                    <h3 className="text-headline-md" style={{ marginBottom: 'var(--space-base)' }}>
                        Aktivitas Terbaru
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                        {activities.length === 0 && (
                            <p style={{ color: 'var(--color-outline)', fontSize: 14 }}>Belum ada aktivitas. Ayo mulai berkarya!</p>
                        )}
                        {activities.map((activity, idx) => (
                            <div
                                key={idx}
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 'var(--space-md)',
                                    paddingBottom: idx < activities.length - 1 ? 'var(--space-md)' : 0,
                                    borderBottom: idx < activities.length - 1 ? '1px solid var(--color-outline-variant)' : 'none',
                                }}
                            >
                                <div
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 'var(--rounded-full)',
                                        background: activity.color + '15',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 16,
                                        flexShrink: 0,
                                    }}
                                >
                                    {activity.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, lineHeight: '20px' }}>{activity.text}</div>
                                    <div style={{ fontSize: 12, color: 'var(--color-outline)', marginTop: 2 }}>{activity.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
