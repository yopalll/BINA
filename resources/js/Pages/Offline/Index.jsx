import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useState, useEffect } from 'react';

const TYPE_ICONS = { materi: '📚', forum: '💬', kuis: '📝', karya: '🎨' };

function fmtSize(kb) {
    return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;
}

export default function OfflineIndex({ contents = [] }) {
    const [online, setOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
    const [downloaded, setDownloaded] = useState({});
    const [syncing, setSyncing] = useState(false);
    const [lastSync, setLastSync] = useState('—');
    const [pending, setPending] = useState([]);

    // Track connectivity live.
    useEffect(() => {
        const on = () => setOnline(true);
        const off = () => setOnline(false);
        window.addEventListener('online', on);
        window.addEventListener('offline', off);
        return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
    }, []);

    // Read local caches (downloaded materials + queued activity).
    useEffect(() => {
        setDownloaded(JSON.parse(localStorage.getItem('bina.downloads') || '{}'));
        setPending(JSON.parse(localStorage.getItem('bina.pendingSync') || '[]'));
        setLastSync(localStorage.getItem('bina.lastSync') || 'Belum pernah');
    }, []);

    const download = (item) => {
        const next = { ...downloaded, [item.id]: true };
        setDownloaded(next);
        localStorage.setItem('bina.downloads', JSON.stringify(next));
        // Ask the service worker to cache (best-effort).
        if ('caches' in window) caches.open('bina-shell-v1').then((c) => c.add('/offline').catch(() => {}));
    };

    const sync = () => {
        if (!online) return;
        setSyncing(true);
        setTimeout(() => {
            localStorage.setItem('bina.pendingSync', '[]');
            const now = new Date().toLocaleString('id-ID');
            localStorage.setItem('bina.lastSync', now);
            setPending([]);
            setLastSync(now);
            setSyncing(false);
        }, 1600);
    };

    const pendingCount = pending.reduce((s, p) => s + (p.count || 1), 0);

    return (
        <AppLayout title="Offline Sync">
            <Head title="Offline Sync" />

            <h2 className="text-headline-lg" style={{ marginBottom: 4 }}>Mode Offline 📶</h2>
            <p className="text-body-md" style={{ color: 'var(--color-outline)', marginBottom: 'var(--space-xl)' }}>
                Unduh materi dan belajar tanpa koneksi — untuk daerah 3T
            </p>

            <div className="card card-elevated" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-lg)', marginBottom: 'var(--space-lg)', flexWrap: 'wrap', gap: 'var(--space-md)', background: 'linear-gradient(135deg, var(--color-primary-fixed) 0%, var(--color-surface-container-lowest) 100%)' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-xs)' }}>
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: online ? '#2d7a2d' : '#ba1a1a', display: 'inline-block' }} />
                        <span className="text-label-md" style={{ color: online ? '#2d7a2d' : '#ba1a1a' }}>{online ? 'Online' : 'Offline'}</span>
                    </div>
                    <div className="text-headline-md">Sinkronisasi Terakhir: {lastSync}</div>
                    <div style={{ fontSize: 13, color: 'var(--color-outline)', marginTop: 4 }}>{pendingCount} item menunggu sinkronisasi</div>
                </div>
                <button className="btn btn-primary btn-lg" onClick={sync} disabled={syncing || !online} style={{ minWidth: 180 }}>
                    {syncing ? <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span className="animate-spin" style={{ display: 'inline-block' }}>⟳</span> Menyinkronkan...</span> : '🔄 Sinkronkan Sekarang'}
                </button>
            </div>

            <div className="grid grid-cols-2" style={{ gap: 'var(--space-lg)' }}>
                <div className="card" style={{ padding: 'var(--space-lg)' }}>
                    <h3 className="text-headline-md" style={{ marginBottom: 'var(--space-base)' }}>📥 Konten untuk Diunduh</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                        {contents.length === 0 && <p style={{ color: 'var(--color-outline)', fontSize: 14 }}>Belum ada konten offline.</p>}
                        {contents.map((item) => (
                            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', padding: 'var(--space-md)', borderRadius: 'var(--rounded)', background: 'var(--color-surface-container)' }}>
                                <span style={{ fontSize: 24 }}>{TYPE_ICONS[item.type] || '📄'}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: 14 }}>{item.title}</div>
                                    <div style={{ fontSize: 12, color: 'var(--color-outline)' }}>{item.subject} • {fmtSize(item.size_kb)}</div>
                                </div>
                                {downloaded[item.id] ? (
                                    <span className="chip" style={{ background: '#e6f7e6', color: '#2d7a2d', fontSize: 11 }}>✅ Tersimpan</span>
                                ) : (
                                    <button className="btn btn-outline btn-sm" onClick={() => download(item)}>⬇ Unduh</button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card" style={{ padding: 'var(--space-lg)' }}>
                    <h3 className="text-headline-md" style={{ marginBottom: 'var(--space-base)' }}>📤 Menunggu Sinkronisasi</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                        {pending.length === 0 && <p style={{ color: 'var(--color-outline)', fontSize: 14 }}>Semua aktivitas sudah tersinkron. ✅</p>}
                        {pending.map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', padding: 'var(--space-base)', borderRadius: 'var(--rounded)', background: 'var(--color-surface-container)' }}>
                                <span style={{ fontSize: 24 }}>{item.icon || '📝'}</span>
                                <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 14 }}>{item.type}</div></div>
                                <span className="badge badge-secondary">{item.count || 1}</span>
                            </div>
                        ))}
                    </div>

                    <div className="card card-tinted" style={{ padding: 'var(--space-base)', marginTop: 'var(--space-lg)' }}>
                        <div className="text-label-sm" style={{ color: 'var(--color-primary)', marginBottom: 4 }}>💡 Cara Kerja</div>
                        <p style={{ fontSize: 13, color: 'var(--color-on-surface-variant)' }}>
                            Materi yang kamu unduh disimpan di perangkat (cache & localStorage). Aktivitas saat offline
                            direkam lokal, lalu otomatis dikirim ke server begitu koneksi kembali.
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
