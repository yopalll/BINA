import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const DIM_META = {
    'Bernalar Kritis': { color: '#5fb7b9', icon: '🧠' },
    'Gotong Royong': { color: '#e8914f', icon: '🤝' },
    'Mandiri': { color: '#316768', icon: '🦅' },
    'Berkebinekaan Global': { color: '#924c0d', icon: '🌍' },
    'Beriman': { color: '#00696b', icon: '🙏' },
    'Kreatif': { color: '#7eb3b4', icon: '🎨' },
};

export default function GuruAnalytics({ byDimension = [], topStudents = [], aiConfigured = false }) {
    const maxTotal = Math.max(1, ...byDimension.map((d) => d.total));

    return (
        <AppLayout title="Analitik AI Guru">
            <Head title="Analitik AI Guru" />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
                <div>
                    <h2 className="text-headline-lg" style={{ marginBottom: 4 }}>Dashboard Analitik AI 📊</h2>
                    <p className="text-body-md" style={{ color: 'var(--color-outline)' }}>
                        Notebook LLM • Meta-Llama-3.1-8B-Instruct • {aiConfigured ? '🟢 AI aktif' : '🔵 Mode heuristik (isi LLAMA_API_KEY untuk AI penuh)'}
                    </p>
                </div>
                <Link href="/guru/dashboard" className="btn btn-outline">← Kembali</Link>
            </div>

            {/* P5 dimensions aggregate */}
            <div className="card" style={{ padding: 'var(--space-lg)', marginBottom: 'var(--space-lg)' }}>
                <h3 className="text-headline-md" style={{ marginBottom: 'var(--space-lg)' }}>Akumulasi Poin per Dimensi Profil Pelajar Pancasila</h3>
                {byDimension.length === 0 ? (
                    <p style={{ color: 'var(--color-outline)' }}>Belum ada data poin karakter.</p>
                ) : (
                    <div className="grid grid-cols-3" style={{ gap: 'var(--space-base)' }}>
                        {byDimension.map((dim) => {
                            const meta = DIM_META[dim.dimension] || { color: '#5fb7b9', icon: '⭐' };
                            return (
                                <div key={dim.dimension} style={{ padding: 'var(--space-base)', borderRadius: 'var(--rounded)', background: 'var(--color-surface-container)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
                                        <span style={{ fontSize: 24 }}>{meta.icon}</span>
                                        <span className="text-label-md">{dim.dimension}</span>
                                    </div>
                                    <div style={{ fontSize: 28, fontWeight: 700, color: meta.color }}>{dim.total.toLocaleString('id-ID')}</div>
                                    <div style={{ fontSize: 12, color: 'var(--color-outline)', marginBottom: 'var(--space-sm)' }}>{dim.students} siswa berkontribusi</div>
                                    <div className="progress-bar">
                                        <div style={{ width: `${(dim.total / maxTotal) * 100}%`, height: '100%', background: meta.color, borderRadius: 'var(--rounded-full)', transition: 'width 1s ease' }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2" style={{ gap: 'var(--space-lg)' }}>
                {/* AI insights (generated from aggregate) */}
                <div className="card" style={{ padding: 'var(--space-lg)' }}>
                    <h3 className="text-headline-md" style={{ marginBottom: 'var(--space-base)' }}>🤖 Insight Otomatis</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                        {byDimension.slice(0, 1).map((d) => (
                            <Insight key="top" icon="📈" severity="positive" text={`Dimensi terkuat kelas: "${d.dimension}" dengan total ${d.total} poin dari ${d.students} siswa.`} />
                        ))}
                        {byDimension.slice(-1).map((d) => (
                            <Insight key="low" icon="👀" severity="attention" text={`Dimensi "${d.dimension}" paling perlu didorong — pertimbangkan proyek kolaboratif.`} />
                        ))}
                        <Insight icon={aiConfigured ? '✅' : '💡'} severity="positive" text={aiConfigured ? 'Analisis sentimen jurnal & forum berjalan otomatis di latar belakang (queue).' : 'Sambungkan LLAMA_API_KEY untuk mengaktifkan analisis sentimen jurnal & forum secara otomatis.'} />
                    </div>
                </div>

                {/* Top students */}
                <div className="card" style={{ padding: 'var(--space-lg)' }}>
                    <h3 className="text-headline-md" style={{ marginBottom: 'var(--space-base)' }}>🏅 Siswa Berkarakter Teratas</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                        {topStudents.length === 0 && <p style={{ color: 'var(--color-outline)', fontSize: 14 }}>Belum ada data.</p>}
                        {topStudents.map((s, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', padding: 'var(--space-sm) var(--space-md)', borderRadius: 'var(--rounded)', background: 'var(--color-surface-container)' }}>
                                <span style={{ fontWeight: 700, width: 24, textAlign: 'center', color: 'var(--color-outline)' }}>{i + 1}</span>
                                <span style={{ fontSize: 22 }}>🧑‍🎓</span>
                                <div style={{ flex: 1, fontWeight: 600, fontSize: 14 }}>{s.name}</div>
                                <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{s.points.toLocaleString('id-ID')} pts</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function Insight({ icon, severity, text }) {
    const bg = severity === 'warning' ? '#fff3e6' : severity === 'attention' ? '#e6f0ff' : '#e6f7e6';
    const bar = severity === 'warning' ? '#e8914f' : severity === 'attention' ? '#5fb7b9' : '#2d7a2d';
    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)', padding: 'var(--space-md)', borderRadius: 'var(--rounded)', background: bg, borderLeft: `4px solid ${bar}` }}>
            <span style={{ fontSize: 20 }}>{icon}</span>
            <p style={{ fontSize: 14, lineHeight: '22px' }}>{text}</p>
        </div>
    );
}
