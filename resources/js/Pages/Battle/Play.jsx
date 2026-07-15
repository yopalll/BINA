import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useState, useEffect } from 'react';

export default function BattlePlay() {
    const [timeLeft, setTimeLeft] = useState(30);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState({ me: 0, opponent: 0 });

    const questions = [
        {
            scenario: 'Kamu menerima pesan broadcast di grup WhatsApp yang berisi berita tentang penculikan anak di depan sekolah. Pesan itu meminta kamu menyebarkan ke semua grup.',
            question: 'Apa tindakan yang paling tepat?',
            options: [
                { id: 'a', text: 'Langsung meneruskan ke semua grup agar semua orang waspada', correct: false },
                { id: 'b', text: 'Memverifikasi kebenaran berita melalui sumber resmi (polisi/sekolah) sebelum menyebarkan', correct: true },
                { id: 'c', text: 'Mengabaikan pesan tersebut karena pasti hoaks', correct: false },
                { id: 'd', text: 'Menambahkan komentar sendiri lalu menyebarkan', correct: false },
            ],
        },
    ];

    const q = questions[currentQuestion];

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    return (
        <AppLayout title="Battle HOTS">
            <Head title="Battle - Soal" />

            {/* Score Bar */}
            <div
                className="card"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--space-base) var(--space-lg)',
                    marginBottom: 'var(--space-lg)',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                    <span style={{ fontSize: 28 }}>🧑‍🎓</span>
                    <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>Kamu</div>
                        <div style={{ fontWeight: 700, fontSize: 22, color: 'var(--color-primary)' }}>{score.me}</div>
                    </div>
                </div>

                {/* Timer */}
                <div
                    style={{
                        width: 72,
                        height: 72,
                        borderRadius: '50%',
                        border: `4px solid ${timeLeft <= 10 ? 'var(--color-error)' : 'var(--color-primary)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        transition: 'border-color var(--transition-fast)',
                    }}
                >
                    <div style={{ fontWeight: 700, fontSize: 24, color: timeLeft <= 10 ? 'var(--color-error)' : 'var(--color-on-surface)' }}>
                        {timeLeft}
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--color-outline)' }}>detik</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>Sari A.</div>
                        <div style={{ fontWeight: 700, fontSize: 22, color: 'var(--color-secondary)' }}>{score.opponent}</div>
                    </div>
                    <span style={{ fontSize: 28 }}>👩‍🎓</span>
                </div>
            </div>

            {/* Question Progress */}
            <div style={{ marginBottom: 'var(--space-base)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-xs)' }}>
                    <span className="text-label-sm">Soal {currentQuestion + 1}/5</span>
                    <span className="text-label-sm" style={{ color: 'var(--color-outline)' }}>Battle Cepat</span>
                </div>
                <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${((currentQuestion + 1) / 5) * 100}%` }} />
                </div>
            </div>

            {/* Scenario Card */}
            <div
                className="card card-tinted"
                style={{
                    padding: 'var(--space-lg)',
                    marginBottom: 'var(--space-base)',
                    borderLeft: '4px solid var(--color-accent-orange)',
                }}
            >
                <div className="text-label-md" style={{ color: 'var(--color-secondary)', marginBottom: 'var(--space-sm)' }}>
                    📋 Skenario
                </div>
                <p className="text-body-lg">{q.scenario}</p>
            </div>

            {/* Question */}
            <h3 className="text-headline-md" style={{ marginBottom: 'var(--space-base)' }}>{q.question}</h3>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {q.options.map((opt) => (
                    <button
                        key={opt.id}
                        className="card"
                        onClick={() => setSelectedAnswer(opt.id)}
                        style={{
                            textAlign: 'left',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-md)',
                            padding: 'var(--space-base) var(--space-lg)',
                            border: selectedAnswer === opt.id ? '2px solid var(--color-primary)' : undefined,
                            background: selectedAnswer === opt.id ? 'var(--color-primary-fixed)' : undefined,
                            transition: 'all var(--transition-fast)',
                        }}
                    >
                        <div
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 'var(--rounded-full)',
                                background: selectedAnswer === opt.id ? 'var(--color-primary)' : 'var(--color-surface-container)',
                                color: selectedAnswer === opt.id ? 'white' : 'var(--color-on-surface)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 700,
                                fontSize: 14,
                                flexShrink: 0,
                                transition: 'all var(--transition-fast)',
                            }}
                        >
                            {opt.id.toUpperCase()}
                        </div>
                        <span style={{ fontSize: 15, lineHeight: '22px' }}>{opt.text}</span>
                    </button>
                ))}
            </div>

            {/* Submit */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-lg)' }}>
                <button className="btn btn-primary btn-lg" disabled={!selectedAnswer}>
                    Jawab & Lanjut →
                </button>
            </div>
        </AppLayout>
    );
}
