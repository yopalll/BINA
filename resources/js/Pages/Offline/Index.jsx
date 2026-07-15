import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useState } from 'react';

const DOWNLOADABLE_CONTENT = [
    { id: 1, type: 'materi', title: 'Matematika - Pecahan', size: '2.4 MB', icon: '📐', downloaded: true },
    { id: 2, type: 'materi', title: 'Bahasa Indonesia - Puisi', size: '1.8 MB', icon: '📖', downloaded: true },
    { id: 3, type: 'forum', title: 'Forum Matematika (24 topik)', size: '856 KB', icon: '💬', downloaded: false },
    { id: 4, type: 'materi', title: 'IPA - Ekosistem', size: '3.1 MB', icon: '🔬', downloaded: false },
    { id: 5, type: 'kuis', title: 'Kuis Pendidikan Pancasila', size: '512 KB', icon: '🇮🇩', downloaded: true },
];

const PENDING_SYNC = [
    { type: 'Draf Tulisan', count: 3, icon: '✍️' },
    { type: 'Hasil Kuis', count: 1, icon: '📝' },
    { type: 'Balasan Forum', count: 5, icon: '💬' },
];

export default function OfflineIndex() {
    const [syncing, setSyncing] = useState(false);

    return (
        <AppLayout title="Offline Sync">
            <Head title="Offline Sync" />

            <h2 className="text-headline-lg" style={{ marginBottom: 4 }}>Mode Offline 📶</h2>
            <p className="text-body-md" style={{ color: 'var(--color-outline)', marginBottom: 'var(--space-xl)' }}>
                Unduh materi dan belajar tanpa koneksi internet
            </p>

            {/* Status Card */}
            <div
                className="card card-elevated"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--space-lg)',
                    marginBottom: 'var(--space-lg)',
                    background: 'linear-gradient(135deg, var(--color-primary-fixed) 0%, var(--color-surface-container-lowest) 100%)',
                }}
            >
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-xs)' }}>
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#2d7a2d', display: 'inline-block' }} />
                        <span className="text-label-md" style={{ color: '#2d7a2d' }}>Online</span>
                    </div>
                    <div className="text-headline-md">Sinkronisasi Terakhir: Hari ini, 14:30</div>
                    <div style={{ fontSize: 13, color: 'var(--color-outline)', marginTop: 4 }}>
                        9 item menunggu sinkronisasi
                    </div>
                </div>
                <button
                    className="btn btn-primary btn-lg"
                    onClick={() => setSyncing(!syncing)}
                    style={{ minWidth: 180 }}
                >
                    {syncing ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span className="animate-spin" style={{ display: 'inline-block' }}>⟳</span> Menyinkronkan...
                        </span>
                    ) : (
                        '🔄 Sinkronkan Sekarang'
                    )}
                </button>
            </div>

            <div className="grid grid-cols-2" style={{ gap: 'var(--space-lg)' }}>
                {/* Downloads */}
                <div className="card" style={{ padding: 'var(--space-lg)' }}>
                    <h3 className="text-headline-md" style={{ marginBottom: 'var(--space-base)' }}>📥 Konten Tersimpan</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                        {DOWNLOADABLE_CONTENT.map((item) => (
                            <div
                                key={item.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--space-md)',
                                    padding: 'var(--space-md)',
                                    borderRadius: 'var(--rounded)',
                                    background: 'var(--color-surface-container)',
                                }}
                            >
                                <span style={{ fontSize: 24 }}>{item.icon}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: 14 }}>{item.title}</div>
                                    <div style={{ fontSize: 12, color: 'var(--color-outline)' }}>{item.size}</div>
                                </div>
                                {item.downloaded ? (
                                    <span className="chip" style={{ background: '#e6f7e6', color: '#2d7a2d', fontSize: 11 }}>✅ Tersimpan</span>
                                ) : (
                                    <button className="btn btn-outline btn-sm">⬇ Unduh</button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pending Sync */}
                <div className="card" style={{ padding: 'var(--space-lg)' }}>
                    <h3 className="text-headline-md" style={{ marginBottom: 'var(--space-base)' }}>📤 Menunggu Sinkronisasi</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                        {PENDING_SYNC.map((item) => (
                            <div
                                key={item.type}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--space-md)',
                                    padding: 'var(--space-base)',
                                    borderRadius: 'var(--rounded)',
                                    background: 'var(--color-surface-container)',
                                }}
                            >
                                <span style={{ fontSize: 24 }}>{item.icon}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: 14 }}>{item.type}</div>
                                </div>
                                <span className="badge badge-secondary">{item.count}</span>
                            </div>
                        ))}
                    </div>

                    <div
                        className="card card-tinted"
                        style={{
                            padding: 'var(--space-base)',
                            marginTop: 'var(--space-lg)',
                        }}
                    >
                        <div className="text-label-sm" style={{ color: 'var(--color-primary)', marginBottom: 4 }}>💡 Tips</div>
                        <p style={{ fontSize: 13, color: 'var(--color-on-surface-variant)' }}>
                            Semua aktivitasmu akan tersimpan lokal secara otomatis dan disinkronkan saat terhubung internet.
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
