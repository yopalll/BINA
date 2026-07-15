import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const SYSTEM_STATS = [
    { icon: '👥', label: 'Total Pengguna', value: '1.247', trend: '+23 minggu ini' },
    { icon: '🏫', label: 'Sekolah Aktif', value: '15', trend: '+2 bulan ini' },
    { icon: '📝', label: 'Karya Diupload', value: '3.892', trend: '+156 minggu ini' },
    { icon: '⚔️', label: 'Battle Dimainkan', value: '8.431', trend: '+342 minggu ini' },
];

const MODERATION_QUEUE = [
    { id: 1, type: 'forum', content: 'Pesan terdeteksi agresi pasif di Forum IPA', user: 'Anonim', time: '10 menit lalu', severity: 'high' },
    { id: 2, type: 'karya', content: 'Karya menunggu verifikasi konten', user: 'Budi S.', time: '1 jam lalu', severity: 'medium' },
    { id: 3, type: 'forum', content: 'Laporan spam dari pengguna', user: 'Rina K.', time: '3 jam lalu', severity: 'low' },
];

const SCHOOLS = [
    { name: 'SDN 1 Jakarta', students: 245, teachers: 12, active: true },
    { name: 'SDN 5 Bandung', students: 198, teachers: 10, active: true },
    { name: 'SDN 3 Surabaya', students: 167, teachers: 8, active: true },
    { name: 'SDN 7 Makassar', students: 134, teachers: 7, active: false },
];

export default function AdminDashboard() {
    return (
        <AppLayout title="Dashboard Admin">
            <Head title="Dashboard Admin" />

            <h2 className="text-headline-lg" style={{ marginBottom: 'var(--space-lg)' }}>Dashboard Admin 🛡️</h2>

            {/* System Stats */}
            <div className="grid grid-cols-4" style={{ gap: 'var(--space-base)', marginBottom: 'var(--space-lg)' }}>
                {SYSTEM_STATS.map((stat) => (
                    <div key={stat.label} className="card card-elevated" style={{ position: 'relative', overflow: 'hidden' }}>
                        <span style={{ fontSize: 28 }}>{stat.icon}</span>
                        <div style={{ fontSize: 28, fontWeight: 700, marginTop: 'var(--space-sm)' }}>{stat.value}</div>
                        <div style={{ fontSize: 13, color: 'var(--color-outline)' }}>{stat.label}</div>
                        <div className="chip" style={{ marginTop: 'var(--space-sm)', fontSize: 11, background: '#e6f7e6', color: '#2d7a2d' }}>
                            {stat.trend}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2" style={{ gap: 'var(--space-lg)' }}>
                {/* Moderation Queue */}
                <div className="card" style={{ padding: 'var(--space-lg)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-base)' }}>
                        <h3 className="text-headline-md">🛡️ Antrean Moderasi</h3>
                        <span className="badge">3</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                        {MODERATION_QUEUE.map((item) => (
                            <div
                                key={item.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 'var(--space-md)',
                                    padding: 'var(--space-md)',
                                    borderRadius: 'var(--rounded)',
                                    background: 'var(--color-surface-container)',
                                    borderLeft: `4px solid ${item.severity === 'high' ? 'var(--color-error)' : item.severity === 'medium' ? 'var(--color-secondary)' : 'var(--color-outline)'}`,
                                }}
                            >
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: 14 }}>{item.content}</div>
                                    <div style={{ fontSize: 12, color: 'var(--color-outline)', marginTop: 2 }}>
                                        {item.user} • {item.time}
                                    </div>
                                </div>
                                <button className="btn btn-outline btn-sm">Review</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* School Management */}
                <div className="card" style={{ padding: 'var(--space-lg)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-base)' }}>
                        <h3 className="text-headline-md">🏫 Manajemen Sekolah</h3>
                        <button className="btn btn-primary btn-sm">+ Tambah</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                        {SCHOOLS.map((school) => (
                            <div
                                key={school.name}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--space-md)',
                                    padding: 'var(--space-md)',
                                    borderRadius: 'var(--rounded)',
                                    background: 'var(--color-surface-container)',
                                }}
                            >
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                        {school.name}
                                        <span
                                            style={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                background: school.active ? '#2d7a2d' : 'var(--color-outline)',
                                                display: 'inline-block',
                                            }}
                                        />
                                    </div>
                                    <div style={{ fontSize: 12, color: 'var(--color-outline)' }}>
                                        {school.students} siswa • {school.teachers} guru
                                    </div>
                                </div>
                                <button className="btn btn-ghost btn-sm">⚙️</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
