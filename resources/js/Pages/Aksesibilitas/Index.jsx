import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useState } from 'react';
import { useAccessibility } from '@/Components/AccessibilityProvider';
import SpeakButton from '@/Components/SpeakButton';

const SAMPLE_TEXT = 'Ini adalah contoh suara. Semua materi, forum, dan karya bisa kamu dengarkan agar belajar jadi lebih mudah dan inklusif untuk semua.';

export default function AksesibilitasIndex({ preferences = {}, ttsLive = false }) {
    const { prefs, update } = useAccessibility();
    const [saving, setSaving] = useState(false);

    // Local editable state seeded from the global prefs / server.
    const [voice, setVoice] = useState(preferences.voice || prefs.voice || 'perempuan');
    const speechRate = prefs.speech_rate ?? 1;
    const fontScale = prefs.font_scale ?? 1;
    const highContrast = prefs.high_contrast ?? false;

    const save = () => {
        setSaving(true);
        router.put('/aksesibilitas', {
            high_contrast: highContrast,
            font_scale: fontScale,
            speech_rate: speechRate,
            voice,
        }, { preserveScroll: true, onFinish: () => setSaving(false) });
    };

    return (
        <AppLayout title="Dengar & Baca">
            <Head title="Pengaturan Aksesibilitas" />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
                <div>
                    <h2 className="text-headline-lg" style={{ marginBottom: 4 }}>Dengar & Baca 🔊</h2>
                    <p className="text-body-md" style={{ color: 'var(--color-outline)' }}>
                        Atur pengalaman belajar sesuai kebutuhanmu • TTS: {ttsLive ? '🟢 Azure aktif' : '🔵 Suara peramban'}
                    </p>
                </div>
                <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? 'Menyimpan...' : '💾 Simpan Pengaturan'}</button>
            </div>

            <div className="grid grid-cols-2" style={{ gap: 'var(--space-lg)' }}>
                {/* Text-to-Speech Settings */}
                <div className="card" style={{ padding: 'var(--space-lg)' }}>
                    <h3 className="text-headline-md" style={{ marginBottom: 'var(--space-lg)' }}>🗣️ Text-to-Speech</h3>

                    <div style={{ marginBottom: 'var(--space-lg)' }}>
                        <label className="text-label-md" style={{ marginBottom: 'var(--space-sm)', display: 'block' }}>Jenis Suara</label>
                        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                            {['perempuan', 'laki-laki'].map((v) => (
                                <button key={v} className="chip" onClick={() => setVoice(v)} style={{ cursor: 'pointer', padding: '10px 20px', fontSize: 14, background: voice === v ? 'var(--color-primary)' : 'var(--color-surface-container)', color: voice === v ? 'white' : 'var(--color-on-surface-variant)' }}>
                                    {v === 'perempuan' ? '👩 Perempuan' : '👨 Laki-laki'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: 'var(--space-lg)' }}>
                        <label className="text-label-md" style={{ marginBottom: 'var(--space-sm)', display: 'block' }}>Kecepatan Bicara: {speechRate}x</label>
                        <input type="range" min="0.5" max="2" step="0.25" value={speechRate} onChange={(e) => update({ speech_rate: parseFloat(e.target.value) })} style={{ width: '100%', accentColor: 'var(--color-primary)' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--color-outline)' }}>
                            <span>Lambat</span><span>Normal</span><span>Cepat</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', padding: 'var(--space-base)', borderRadius: 'var(--rounded)', background: 'var(--color-surface-container)' }}>
                        <SpeakButton text={SAMPLE_TEXT} rate={speechRate} size={40} />
                        <span style={{ fontSize: 14 }}>Klik untuk mendengar contoh suara</span>
                    </div>
                </div>

                {/* Display Settings */}
                <div className="card" style={{ padding: 'var(--space-lg)' }}>
                    <h3 className="text-headline-md" style={{ marginBottom: 'var(--space-lg)' }}>👁️ Tampilan</h3>

                    <div style={{ marginBottom: 'var(--space-lg)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-base)', borderRadius: 'var(--rounded)', background: 'var(--color-surface-container)', cursor: 'pointer' }} onClick={() => update({ high_contrast: !highContrast })}>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: 14 }}>Mode Kontras Tinggi</div>
                                <div style={{ fontSize: 12, color: 'var(--color-outline)', marginTop: 2 }}>Untuk pengguna low vision</div>
                            </div>
                            <div style={{ width: 48, height: 28, borderRadius: 'var(--rounded-full)', background: highContrast ? 'var(--color-primary)' : 'var(--color-outline-variant)', position: 'relative', transition: 'background var(--transition-fast)' }}>
                                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: highContrast ? 23 : 3, transition: 'left var(--transition-fast)', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: 'var(--space-lg)' }}>
                        <label className="text-label-md" style={{ marginBottom: 'var(--space-sm)', display: 'block' }}>Ukuran Teks: {Math.round(16 * fontScale)}px</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                            <button className="btn btn-ghost" style={{ width: 40, height: 40, borderRadius: 'var(--rounded-full)', fontSize: 18 }} onClick={() => update({ font_scale: Math.max(0.8, +(fontScale - 0.1).toFixed(2)) })}>A-</button>
                            <input type="range" min="0.8" max="1.6" step="0.1" value={fontScale} onChange={(e) => update({ font_scale: parseFloat(e.target.value) })} style={{ flex: 1, accentColor: 'var(--color-primary)' }} />
                            <button className="btn btn-ghost" style={{ width: 40, height: 40, borderRadius: 'var(--rounded-full)', fontSize: 22 }} onClick={() => update({ font_scale: Math.min(1.6, +(fontScale + 0.1).toFixed(2)) })}>A+</button>
                        </div>
                    </div>

                    <div className="card card-tinted" style={{ padding: 'var(--space-base)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xs)' }}>
                            <div style={{ fontWeight: 600 }}>Pratinjau Teks</div>
                            <SpeakButton text="Ini adalah contoh tampilan teks dengan pengaturan yang kamu pilih." rate={speechRate} />
                        </div>
                        <p>Ini adalah contoh tampilan teks dengan pengaturan yang kamu pilih. Perubahan ukuran & kontras langsung berlaku ke seluruh aplikasi.</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
