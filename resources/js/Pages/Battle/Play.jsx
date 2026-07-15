import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useState, useEffect, useCallback } from 'react';
import SpeakButton from '@/Components/SpeakButton';

export default function BattlePlay({ questions = [], opponent = { name: 'Lawan' } }) {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(questions[0]?.time_per_question ?? 30);
    const [submitting, setSubmitting] = useState(false);

    const total = questions.length;
    const q = questions[current];

    const next = useCallback(() => {
        const recorded = [...answers, { question_id: q.id, option_id: selected }];
        setAnswers(recorded);
        setSelected(null);

        if (current + 1 >= total) {
            // Submit via fetch to get JSON result, then navigate.
            setSubmitting(true);
            fetch('/battle/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ answers: recorded }),
            })
                .then((r) => r.json())
                .then((data) => {
                    sessionStorage.setItem('bina.battleResult', JSON.stringify(data));
                    router.visit(`/battle/result?win=${data.win ? 1 : 0}`);
                })
                .catch(() => router.visit('/battle/result?win=0'));
        } else {
            setCurrent((c) => c + 1);
            setTimeLeft(questions[current + 1]?.time_per_question ?? 30);
        }
    }, [answers, q, selected, current, total, questions]);

    // Countdown timer — auto-advance on timeout.
    useEffect(() => {
        if (submitting) return;
        if (timeLeft <= 0) { next(); return; }
        const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, submitting, next]);

    if (!q) {
        return (
            <AppLayout title="Battle HOTS">
                <Head title="Battle - Soal" />
                <div className="card" style={{ textAlign: 'center' }}>Belum ada soal tersedia. Hubungi gurumu.</div>
            </AppLayout>
        );
    }

    return (
        <AppLayout title="Battle HOTS">
            <Head title="Battle - Soal" />

            {/* Score / Timer Bar */}
            <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-base) var(--space-lg)', marginBottom: 'var(--space-lg)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                    <span style={{ fontSize: 28 }}>🧑‍🎓</span>
                    <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>Kamu</div>
                        <div style={{ fontWeight: 700, fontSize: 22, color: 'var(--color-primary)' }}>{answers.filter((a) => a.option_id).length}</div>
                    </div>
                </div>
                <div style={{ width: 72, height: 72, borderRadius: '50%', border: `4px solid ${timeLeft <= 10 ? 'var(--color-error)' : 'var(--color-primary)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <div style={{ fontWeight: 700, fontSize: 24, color: timeLeft <= 10 ? 'var(--color-error)' : 'var(--color-on-surface)' }}>{timeLeft}</div>
                    <div style={{ fontSize: 10, color: 'var(--color-outline)' }}>detik</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{opponent.name}</div>
                        <div style={{ fontWeight: 700, fontSize: 22, color: 'var(--color-secondary)' }}>{current}</div>
                    </div>
                    <span style={{ fontSize: 28 }}>👩‍🎓</span>
                </div>
            </div>

            {/* Progress */}
            <div style={{ marginBottom: 'var(--space-base)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-xs)' }}>
                    <span className="text-label-sm">Soal {current + 1}/{total}</span>
                    <span className="text-label-sm" style={{ color: 'var(--color-outline)' }}>{q.subject}</span>
                </div>
                <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${((current + 1) / total) * 100}%` }} />
                </div>
            </div>

            {/* Scenario */}
            <div className="card card-tinted" style={{ padding: 'var(--space-lg)', marginBottom: 'var(--space-base)', borderLeft: '4px solid var(--color-accent-orange)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
                    <div className="text-label-md" style={{ color: 'var(--color-secondary)' }}>📋 Skenario</div>
                    <SpeakButton text={`${q.scenario}. ${q.question}`} />
                </div>
                <p className="text-body-lg">{q.scenario}</p>
            </div>

            <h3 className="text-headline-md" style={{ marginBottom: 'var(--space-base)' }}>{q.question}</h3>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {q.options.map((opt) => (
                    <button
                        key={opt.id}
                        className="card"
                        onClick={() => setSelected(opt.id)}
                        style={{
                            textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 'var(--space-md)',
                            padding: 'var(--space-base) var(--space-lg)',
                            border: selected === opt.id ? '2px solid var(--color-primary)' : undefined,
                            background: selected === opt.id ? 'var(--color-primary-fixed)' : undefined,
                        }}
                    >
                        <div style={{ width: 36, height: 36, borderRadius: 'var(--rounded-full)', background: selected === opt.id ? 'var(--color-primary)' : 'var(--color-surface-container)', color: selected === opt.id ? 'white' : 'var(--color-on-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                            {opt.id.toUpperCase()}
                        </div>
                        <span style={{ fontSize: 15, lineHeight: '22px' }}>{opt.text}</span>
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-lg)' }}>
                <button className="btn btn-primary btn-lg" disabled={!selected || submitting} onClick={next}>
                    {current + 1 >= total ? 'Selesai & Lihat Hasil' : 'Jawab & Lanjut →'}
                </button>
            </div>
        </AppLayout>
    );
}
