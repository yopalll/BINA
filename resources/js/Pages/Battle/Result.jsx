import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function BattleResult({ win = true }) {
    return (
        <AppLayout title="Hasil Battle">
            <Head title={win ? 'Kamu Menang!' : 'Kalah...'} />

            <div
                style={{
                    textAlign: 'center',
                    maxWidth: 500,
                    margin: '0 auto',
                    paddingTop: 'var(--space-xl)',
                }}
            >
                {/* Result Icon */}
                <div
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        background: win
                            ? 'linear-gradient(135deg, #fea360, #e8914f)'
                            : 'linear-gradient(135deg, #dadadc, #6e7979)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 56,
                        margin: '0 auto var(--space-lg)',
                        boxShadow: win ? '0 8px 32px rgba(232,145,79,0.3)' : 'var(--shadow-soft)',
                    }}
                >
                    {win ? '🏆' : '😔'}
                </div>

                <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                    {win ? 'Kamu Menang! 🎉' : 'Jangan Menyerah!'}
                </h2>
                <p style={{ fontSize: 16, color: 'var(--color-outline)', marginBottom: 'var(--space-xl)' }}>
                    {win
                        ? 'Hebat! Kemampuan bernalar kritismu semakin tajam!'
                        : 'Setiap kekalahan adalah pelajaran. Ayo coba lagi!'}
                </p>

                {/* Score Card */}
                <div
                    className="card card-elevated"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        padding: 'var(--space-lg)',
                        marginBottom: 'var(--space-lg)',
                    }}
                >
                    <div>
                        <div style={{ fontSize: 28 }}>🧑‍🎓</div>
                        <div style={{ fontWeight: 600, fontSize: 14, marginTop: 4 }}>Kamu</div>
                        <div style={{ fontWeight: 700, fontSize: 28, color: win ? 'var(--color-primary)' : 'var(--color-error)' }}>
                            {win ? 4 : 2}
                        </div>
                    </div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-outline)', alignSelf: 'center' }}>VS</div>
                    <div>
                        <div style={{ fontSize: 28 }}>👩‍🎓</div>
                        <div style={{ fontWeight: 600, fontSize: 14, marginTop: 4 }}>Sari A.</div>
                        <div style={{ fontWeight: 700, fontSize: 28, color: !win ? 'var(--color-primary)' : 'var(--color-error)' }}>
                            {win ? 2 : 4}
                        </div>
                    </div>
                </div>

                {/* Rewards */}
                {win && (
                    <div className="card card-tinted" style={{ padding: 'var(--space-lg)', marginBottom: 'var(--space-lg)' }}>
                        <div className="text-label-md" style={{ color: 'var(--color-secondary)', marginBottom: 'var(--space-sm)' }}>🎁 Hadiah</div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-lg)' }}>
                            <div>
                                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-primary)' }}>+25</div>
                                <div style={{ fontSize: 12, color: 'var(--color-outline)' }}>Poin Karakter</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-secondary)' }}>+50</div>
                                <div style={{ fontSize: 12, color: 'var(--color-outline)' }}>XP Battle</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
                    <button className="btn btn-primary btn-lg">Battle Lagi</button>
                    <button className="btn btn-outline btn-lg">Lihat Pembahasan</button>
                </div>
            </div>
        </AppLayout>
    );
}
