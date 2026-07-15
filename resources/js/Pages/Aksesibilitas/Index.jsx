import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useState } from 'react';

export default function AksesibilitasIndex() {
    const [speechRate, setSpeechRate] = useState(1);
    const [voiceType, setVoiceType] = useState('wanita');
    const [voiceStyle, setVoiceStyle] = useState('santai');
    const [highContrast, setHighContrast] = useState(false);
    const [fontSize, setFontSize] = useState(16);

    return (
        <AppLayout title="Dengar & Baca">
            <Head title="Pengaturan Aksesibilitas" />

            <h2 className="text-headline-lg" style={{ marginBottom: 4 }}>Dengar & Baca 🔊</h2>
            <p className="text-body-md" style={{ color: 'var(--color-outline)', marginBottom: 'var(--space-xl)' }}>
                Atur pengalaman belajar sesuai kebutuhanmu
            </p>

            <div className="grid grid-cols-2" style={{ gap: 'var(--space-lg)' }}>
                {/* Text-to-Speech Settings */}
                <div className="card" style={{ padding: 'var(--space-lg)' }}>
                    <h3 className="text-headline-md" style={{ marginBottom: 'var(--space-lg)' }}>🗣️ Text-to-Speech</h3>

                    {/* Voice Type */}
                    <div style={{ marginBottom: 'var(--space-lg)' }}>
                        <label className="text-label-md" style={{ marginBottom: 'var(--space-sm)', display: 'block' }}>Jenis Suara</label>
                        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                            {['wanita', 'pria'].map((v) => (
                                <button
                                    key={v}
                                    className="chip"
                                    onClick={() => setVoiceType(v)}
                                    style={{
                                        cursor: 'pointer',
                                        padding: '10px 20px',
                                        fontSize: 14,
                                        background: voiceType === v ? 'var(--color-primary)' : 'var(--color-surface-container)',
                                        color: voiceType === v ? 'white' : 'var(--color-on-surface-variant)',
                                    }}
                                >
                                    {v === 'wanita' ? '👩 Wanita' : '👨 Pria'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Voice Style */}
                    <div style={{ marginBottom: 'var(--space-lg)' }}>
                        <label className="text-label-md" style={{ marginBottom: 'var(--space-sm)', display: 'block' }}>Gaya Bicara</label>
                        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                            {['formal', 'santai'].map((s) => (
                                <button
                                    key={s}
                                    className="chip"
                                    onClick={() => setVoiceStyle(s)}
                                    style={{
                                        cursor: 'pointer',
                                        padding: '10px 20px',
                                        fontSize: 14,
                                        background: voiceStyle === s ? 'var(--color-primary)' : 'var(--color-surface-container)',
                                        color: voiceStyle === s ? 'white' : 'var(--color-on-surface-variant)',
                                    }}
                                >
                                    {s === 'formal' ? '📋 Formal' : '😊 Santai'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Speech Rate */}
                    <div style={{ marginBottom: 'var(--space-lg)' }}>
                        <label className="text-label-md" style={{ marginBottom: 'var(--space-sm)', display: 'block' }}>
                            Kecepatan Bicara: {speechRate}x
                        </label>
                        <input
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.25"
                            value={speechRate}
                            onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                            style={{
                                width: '100%',
                                accentColor: 'var(--color-primary)',
                            }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--color-outline)' }}>
                            <span>Lambat</span>
                            <span>Normal</span>
                            <span>Cepat</span>
                        </div>
                    </div>

                    {/* Preview Button */}
                    <button className="btn btn-primary w-full">▶ Dengarkan Contoh</button>
                </div>

                {/* Display Settings */}
                <div className="card" style={{ padding: 'var(--space-lg)' }}>
                    <h3 className="text-headline-md" style={{ marginBottom: 'var(--space-lg)' }}>👁️ Tampilan</h3>

                    {/* High Contrast */}
                    <div style={{ marginBottom: 'var(--space-lg)' }}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: 'var(--space-base)',
                                borderRadius: 'var(--rounded)',
                                background: 'var(--color-surface-container)',
                                cursor: 'pointer',
                            }}
                            onClick={() => setHighContrast(!highContrast)}
                        >
                            <div>
                                <div style={{ fontWeight: 600, fontSize: 14 }}>Mode Kontras Tinggi</div>
                                <div style={{ fontSize: 12, color: 'var(--color-outline)', marginTop: 2 }}>Untuk pengguna low vision</div>
                            </div>
                            <div
                                style={{
                                    width: 48,
                                    height: 28,
                                    borderRadius: 'var(--rounded-full)',
                                    background: highContrast ? 'var(--color-primary)' : 'var(--color-outline-variant)',
                                    position: 'relative',
                                    transition: 'background var(--transition-fast)',
                                }}
                            >
                                <div
                                    style={{
                                        width: 22,
                                        height: 22,
                                        borderRadius: '50%',
                                        background: 'white',
                                        position: 'absolute',
                                        top: 3,
                                        left: highContrast ? 23 : 3,
                                        transition: 'left var(--transition-fast)',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Font Size */}
                    <div style={{ marginBottom: 'var(--space-lg)' }}>
                        <label className="text-label-md" style={{ marginBottom: 'var(--space-sm)', display: 'block' }}>
                            Ukuran Teks: {fontSize}px
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                            <button
                                className="btn btn-ghost"
                                style={{ width: 40, height: 40, borderRadius: 'var(--rounded-full)', fontSize: 18 }}
                                onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                            >
                                A-
                            </button>
                            <input
                                type="range"
                                min="12"
                                max="24"
                                step="2"
                                value={fontSize}
                                onChange={(e) => setFontSize(parseInt(e.target.value))}
                                style={{ flex: 1, accentColor: 'var(--color-primary)' }}
                            />
                            <button
                                className="btn btn-ghost"
                                style={{ width: 40, height: 40, borderRadius: 'var(--rounded-full)', fontSize: 22 }}
                                onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                            >
                                A+
                            </button>
                        </div>
                    </div>

                    {/* Preview */}
                    <div
                        className="card card-tinted"
                        style={{
                            padding: 'var(--space-base)',
                            fontSize: `${fontSize}px`,
                            background: highContrast ? '#000' : undefined,
                            color: highContrast ? '#fff' : undefined,
                            transition: 'all var(--transition-base)',
                        }}
                    >
                        <div style={{ fontWeight: 600, marginBottom: 'var(--space-xs)' }}>Pratinjau Teks</div>
                        <p>Ini adalah contoh tampilan teks dengan pengaturan yang kamu pilih. Semua materi, forum, dan karya akan ditampilkan dengan ukuran ini.</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
