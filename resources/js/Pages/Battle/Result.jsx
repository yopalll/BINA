import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useEffect, useState } from 'react';

export default function BattleResult({ win: winProp = true }) {
    const [result, setResult] = useState(null);
    const [showReview, setShowReview] = useState(false);

    useEffect(() => {
        const raw = sessionStorage.getItem('bina.battleResult');
        if (raw) setResult(JSON.parse(raw));
    }, []);

    const win = result ? result.win : winProp;
    const myScore = result ? result.correct : (win ? 4 : 2);
    const oppScore = result ? Math.max(0, result.total - result.correct) : (win ? 2 : 4);
    const points = result ? result.points : (win ? 25 : 0);
    const review = result?.review ?? [];

    return (
        <AppLayout title="Hasil Battle">
            <Head title={win ? 'Kamu Menang!' : 'Kalah...'} />

            <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto', paddingTop: 'var(--space-xl)' }}>
                <div style={{ width: 120, height: 120, borderRadius: '50%', background: win ? 'linear-gradient(135deg, #fea360, #e8914f)' : 'linear-gradient(135deg, #dadadc, #6e7979)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, margin: '0 auto var(--space-lg)', boxShadow: win ? '0 8px 32px rgba(232,145,79,0.3)' : 'var(--shadow-soft)' }}>
                    {win ? '🏆' : '😔'}
                </div>

                <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                    {win ? 'Kamu Menang! 🎉' : 'Jangan Menyerah!'}
                </h2>
                <p style={{ fontSize: 16, color: 'var(--color-outline)', marginBottom: 'var(--space-xl)' }}>
                    {win ? 'Hebat! Kemampuan bernalar kritismu semakin tajam!' : 'Setiap kekalahan adalah pelajaran. Ayo coba lagi!'}
                </p>

                <div className="card card-elevated" style={{ display: 'flex', justifyContent: 'space-around', padding: 'var(--space-lg)', marginBottom: 'var(--space-lg)' }}>
                    <div>
                        <div style={{ fontSize: 28 }}>🧑‍🎓</div>
                        <div style={{ fontWeight: 600, fontSize: 14, marginTop: 4 }}>Kamu</div>
                        <div style={{ fontWeight: 700, fontSize: 28, color: win ? 'var(--color-primary)' : 'var(--color-error)' }}>{myScore}</div>
                    </div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-outline)', alignSelf: 'center' }}>VS</div>
                    <div>
                        <div style={{ fontSize: 28 }}>👩‍🎓</div>
                        <div style={{ fontWeight: 600, fontSize: 14, marginTop: 4 }}>Lawan</div>
                        <div style={{ fontWeight: 700, fontSize: 28, color: !win ? 'var(--color-primary)' : 'var(--color-error)' }}>{oppScore}</div>
                    </div>
                </div>

                {points > 0 && (
                    <div className="card card-tinted" style={{ padding: 'var(--space-lg)', marginBottom: 'var(--space-lg)' }}>
                        <div className="text-label-md" style={{ color: 'var(--color-secondary)', marginBottom: 'var(--space-sm)' }}>🎁 Hadiah</div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-lg)' }}>
                            <div>
                                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-primary)' }}>+{points}</div>
                                <div style={{ fontSize: 12, color: 'var(--color-outline)' }}>Poin Karakter</div>
                            </div>
                        </div>
                    </div>
                )}

                <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', marginBottom: 'var(--space-lg)' }}>
                    <Link href="/battle" className="btn btn-primary btn-lg">Battle Lagi</Link>
                    {review.length > 0 && (
                        <button className="btn btn-outline btn-lg" onClick={() => setShowReview((s) => !s)}>
                            {showReview ? 'Sembunyikan' : 'Lihat Pembahasan'}
                        </button>
                    )}
                </div>

                {/* Answer review — reveal correct/wrong + explanation */}
                {showReview && (
                    <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 'var(--space-base)' }}>
                        {review.map((r, i) => (
                            <div key={i} className="card" style={{ borderLeft: `4px solid ${r.is_correct ? 'var(--color-primary)' : 'var(--color-error)'}` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                                    <span style={{ fontSize: 20 }}>{r.is_correct ? '✅' : '❌'}</span>
                                    <strong style={{ fontSize: 14 }}>Soal {i + 1}: {r.is_correct ? 'Benar' : 'Kurang tepat'}</strong>
                                </div>
                                <p style={{ fontSize: 14, marginBottom: 'var(--space-sm)' }}>{r.question}</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    {r.options.map((opt) => {
                                        const isCorrect = opt.id === r.correct_option_id;
                                        const isYours = opt.id === r.your_answer;
                                        return (
                                            <div key={opt.id} style={{ padding: '6px 12px', borderRadius: 'var(--rounded-sm)', fontSize: 13, background: isCorrect ? '#e6f7e6' : isYours ? 'var(--color-error-container)' : 'transparent', color: isCorrect ? '#2d7a2d' : isYours ? 'var(--color-on-error-container)' : 'inherit' }}>
                                                {opt.id.toUpperCase()}. {opt.text} {isCorrect ? ' ✓' : isYours ? ' ← jawabanmu' : ''}
                                            </div>
                                        );
                                    })}
                                </div>
                                {r.explanation && (
                                    <p style={{ fontSize: 13, color: 'var(--color-outline)', marginTop: 'var(--space-sm)', fontStyle: 'italic' }}>💡 {r.explanation}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
