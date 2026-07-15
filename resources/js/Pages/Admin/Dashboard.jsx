import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const ROLE_LABELS = { siswa: '🧑‍🎓 Siswa', guru: '👩‍🏫 Guru', admin: '🛠️ Admin' };

function StatCard({ icon, label, value }) {
    return (
        <div className="card card-elevated" style={{ position: 'relative', overflow: 'hidden' }}>
            <span style={{ fontSize: 28 }}>{icon}</span>
            <div style={{ fontSize: 28, fontWeight: 700, marginTop: 'var(--space-sm)' }}>{value}</div>
            <div style={{ fontSize: 13, color: 'var(--color-outline)' }}>{label}</div>
        </div>
    );
}

export default function AdminDashboard({ stats, schools = [], recentUsers = [] }) {
    return (
        <AppLayout title="Dashboard Admin">
            <Head title="Dashboard Admin" />

            <h2 className="text-headline-lg" style={{ marginBottom: 4 }}>Dashboard Admin 🛠️</h2>
            <p className="text-body-md" style={{ color: 'var(--color-outline)', marginBottom: 'var(--space-lg)' }}>
                Kelola sekolah, akun pengguna, dan pantau data platform
            </p>

            <div className="grid grid-cols-4" style={{ gap: 'var(--space-base)', marginBottom: 'var(--space-lg)' }}>
                <StatCard icon="🏫" label="Sekolah" value={stats?.schools ?? 0} />
                <StatCard icon="🧑‍🎓" label="Total Siswa" value={stats?.students ?? 0} />
                <StatCard icon="👩‍🏫" label="Total Guru" value={stats?.teachers ?? 0} />
                <StatCard icon="🎨" label="Total Karya" value={stats?.karya ?? 0} />
            </div>

            <div className="grid grid-cols-2" style={{ gap: 'var(--space-lg)' }}>
                {/* School management */}
                <div className="card" style={{ padding: 'var(--space-lg)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-base)' }}>
                        <h3 className="text-headline-md">🏫 Manajemen Sekolah</h3>
                        <button className="btn btn-primary btn-sm">+ Tambah</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                        {schools.length === 0 && <p style={{ color: 'var(--color-outline)', fontSize: 14 }}>Belum ada sekolah.</p>}
                        {schools.map((school) => (
                            <div key={school.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', padding: 'var(--space-md)', borderRadius: 'var(--rounded)', background: 'var(--color-surface-container)' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                        {school.name}
                                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: school.is_active ? '#2d7a2d' : 'var(--color-outline)', display: 'inline-block' }} />
                                    </div>
                                    <div style={{ fontSize: 12, color: 'var(--color-outline)' }}>{school.city || '—'} • {school.users} pengguna</div>
                                </div>
                                <button className="btn btn-ghost btn-sm">⚙️</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent users */}
                <div className="card" style={{ padding: 'var(--space-lg)' }}>
                    <h3 className="text-headline-md" style={{ marginBottom: 'var(--space-base)' }}>👥 Pengguna Terbaru</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                        {recentUsers.map((u) => (
                            <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', padding: 'var(--space-sm) var(--space-md)', borderRadius: 'var(--rounded)', background: 'var(--color-surface-container)' }}>
                                <span style={{ fontSize: 22 }}>{ROLE_LABELS[u.role]?.split(' ')[0] || '👤'}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: 14 }}>{u.name}</div>
                                    <div style={{ fontSize: 12, color: 'var(--color-outline)' }}>{u.school || 'Tanpa sekolah'}</div>
                                </div>
                                <span className="chip chip-outline" style={{ fontSize: 11 }}>{ROLE_LABELS[u.role] || u.role}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
