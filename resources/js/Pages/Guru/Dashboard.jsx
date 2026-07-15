import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const P5_DIMENSIONS = [
    { name: 'Bernalar Kritis', score: 78, color: '#5fb7b9', icon: '🧠' },
    { name: 'Gotong Royong', score: 85, color: '#e8914f', icon: '🤝' },
    { name: 'Mandiri', score: 72, color: '#316768', icon: '💪' },
    { name: 'Berkebinekaan Global', score: 65, color: '#924c0d', icon: '🌍' },
    { name: 'Beriman & Bertakwa', score: 90, color: '#00696b', icon: '🙏' },
    { name: 'Kreatif', score: 82, color: '#7eb3b4', icon: '🎨' },
];

const STUDENT_SUMMARY = [
    { name: 'Dewi Lestari', avatar: '👩‍🎨', topDimension: 'Gotong Royong', score: 92, flag: null },
    { name: 'Andi Pratama', avatar: '🧑‍🔬', topDimension: 'Bernalar Kritis', score: 88, flag: null },
    { name: 'Budi Santoso', avatar: '🧑‍🎓', topDimension: 'Mandiri', score: 75, flag: 'attention' },
    { name: 'Rina Kusuma', avatar: '👧', topDimension: 'Kreatif', score: 81, flag: null },
    { name: 'Fajar Maulana', avatar: '🧑‍💻', topDimension: 'Bernalar Kritis', score: 60, flag: 'warning' },
];

const RECENT_AI_INSIGHTS = [
    { text: 'Fajar menunjukkan penurunan partisipasi di forum 40% dalam 2 minggu terakhir.', severity: 'warning', icon: '⚠️' },
    { text: 'Budi membutuhkan perhatian lebih di dimensi "Berkebinekaan Global".', severity: 'attention', icon: '👀' },
    { text: 'Kelas 5B menunjukkan peningkatan 15% di dimensi "Gotong Royong".', severity: 'positive', icon: '📈' },
];

export default function GuruDashboard() {
    return (
        <AppLayout title="Dashboard Guru">
            <Head title="Dashboard Guru" />

            <h2 className="text-headline-lg" style={{ marginBottom: 4 }}>Dashboard Analitik Guru 📊</h2>
            <p className="text-body-md" style={{ color: 'var(--color-outline)', marginBottom: 'var(--space-xl)' }}>
                Powered by AI — Meta-Llama-3.1-8B-Instruct
            </p>

            {/* P5 Dimension Overview */}
            <div className="card" style={{ padding: 'var(--space-lg)', marginBottom: 'var(--space-lg)' }}>
                <h3 className="text-headline-md" style={{ marginBottom: 'var(--space-lg)' }}>
                    Rata-rata Profil Pelajar Pancasila (P5) — Kelas 5B
                </h3>
                <div className="grid grid-cols-3" style={{ gap: 'var(--space-base)' }}>
                    {P5_DIMENSIONS.map((dim) => (
                        <div
                            key={dim.name}
                            style={{
                                padding: 'var(--space-base)',
                                borderRadius: 'var(--rounded)',
                                background: 'var(--color-surface-container)',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
                                <span style={{ fontSize: 24 }}>{dim.icon}</span>
                                <span className="text-label-md">{dim.name}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--space-sm)' }}>
                                <span style={{ fontSize: 28, fontWeight: 700, color: dim.color }}>{dim.score}%</span>
                            </div>
                            <div className="progress-bar" style={{ marginTop: 'var(--space-sm)' }}>
                                <div
                                    style={{
                                        width: `${dim.score}%`,
                                        height: '100%',
                                        background: dim.color,
                                        borderRadius: 'var(--rounded-full)',
                                        transition: 'width 1s ease',
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2" style={{ gap: 'var(--space-lg)' }}>
                {/* AI Insights */}
                <div className="card" style={{ padding: 'var(--space-lg)' }}>
                    <h3 className="text-headline-md" style={{ marginBottom: 'var(--space-base)' }}>🤖 Insight AI Otomatis</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                        {RECENT_AI_INSIGHTS.map((insight, idx) => (
                            <div
                                key={idx}
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 'var(--space-md)',
                                    padding: 'var(--space-md)',
                                    borderRadius: 'var(--rounded)',
                                    background: insight.severity === 'warning' ? '#fff3e6'
                                        : insight.severity === 'attention' ? '#e6f0ff'
                                        : '#e6f7e6',
                                    borderLeft: `4px solid ${insight.severity === 'warning' ? '#e8914f' : insight.severity === 'attention' ? '#5fb7b9' : '#2d7a2d'}`,
                                }}
                            >
                                <span style={{ fontSize: 20 }}>{insight.icon}</span>
                                <p style={{ fontSize: 14, lineHeight: '22px' }}>{insight.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Student Summary */}
                <div className="card" style={{ padding: 'var(--space-lg)' }}>
                    <h3 className="text-headline-md" style={{ marginBottom: 'var(--space-base)' }}>👥 Ringkasan Siswa</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                        {STUDENT_SUMMARY.map((student) => (
                            <div
                                key={student.name}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--space-md)',
                                    padding: 'var(--space-sm) var(--space-md)',
                                    borderRadius: 'var(--rounded)',
                                    background: student.flag === 'warning' ? '#fff3e610' : 'transparent',
                                }}
                            >
                                <span style={{ fontSize: 24 }}>{student.avatar}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: 14 }}>{student.name}</div>
                                    <div style={{ fontSize: 12, color: 'var(--color-outline)' }}>Top: {student.topDimension}</div>
                                </div>
                                <span
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 16,
                                        color: student.score >= 80 ? 'var(--color-primary)' : student.score >= 70 ? 'var(--color-secondary)' : 'var(--color-error)',
                                    }}
                                >
                                    {student.score}%
                                </span>
                                {student.flag && (
                                    <span style={{ fontSize: 16 }}>
                                        {student.flag === 'warning' ? '⚠️' : '👀'}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
