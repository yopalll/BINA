import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const TYPE_ICONS = { tulisan: '✍️', aksi: '🦸', gambar: '🖼️', prakarya: '🔧', puisi: '📜', video: '🎬' };

function StatCard({ icon, label, value, color }) {
    return (
        <div className="card card-elevated" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-base)' }}>
            <div style={{ width: 52, height: 52, borderRadius: 'var(--rounded)', background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>{icon}</div>
            <div>
                <div style={{ fontSize: 28, fontWeight: 700 }}>{value}</div>
                <div style={{ fontSize: 13, color: 'var(--color-outline)' }}>{label}</div>
            </div>
        </div>
    );
}

export default function GuruDashboard({ stats, pendingKarya = [] }) {
    const approve = (id) => router.post(`/guru/karya/${id}/approve`, {}, { preserveScroll: true });

    return (
        <AppLayout title="Dashboard Guru">
            <Head title="Dashboard Guru" />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
                <div>
                    <h2 className="text-headline-lg" style={{ marginBottom: 4 }}>Dashboard Guru 📋</h2>
                    <p className="text-body-md" style={{ color: 'var(--color-outline)' }}>Kelola siswa, validasi karya, dan moderasi diskusi</p>
                </div>
                <Link href="/guru/analitik" className="btn btn-primary">📊 Lihat Analitik AI</Link>
            </div>

            <div className="grid grid-cols-3" style={{ gap: 'var(--space-base)', marginBottom: 'var(--space-lg)' }}>
                <StatCard icon="👥" label="Total Siswa" value={stats?.students ?? 0} color="#5fb7b9" />
                <StatCard icon="⏳" label="Karya Menunggu Validasi" value={stats?.pending_karya ?? 0} color="#e8914f" />
                <StatCard icon="🚩" label="Konten Ditandai Moderasi" value={stats?.flagged ?? 0} color="#ba1a1a" />
            </div>

            <div className="card" style={{ padding: 'var(--space-lg)' }}>
                <h3 className="text-headline-md" style={{ marginBottom: 'var(--space-base)' }}>⏳ Antrean Validasi Karya</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                    {pendingKarya.length === 0 && <p style={{ color: 'var(--color-outline)', fontSize: 14 }}>Tidak ada karya yang menunggu. Semua sudah divalidasi! ✅</p>}
                    {pendingKarya.map((k) => (
                        <div key={k.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', padding: 'var(--space-md)', borderRadius: 'var(--rounded)', background: 'var(--color-surface-container)' }}>
                            <span style={{ fontSize: 24 }}>{TYPE_ICONS[k.type] || '🎨'}</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, fontSize: 14 }}>{k.title}</div>
                                <div style={{ fontSize: 12, color: 'var(--color-outline)' }}>oleh {k.author} • {k.type}</div>
                            </div>
                            <button className="btn btn-primary btn-sm" onClick={() => approve(k.id)}>✅ Setujui & Beri Poin</button>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
