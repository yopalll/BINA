import { Head, router, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useState } from 'react';
import { detect } from '@/lib/profanity';

const TYPE_COLORS = { tulisan: '#5fb7b9', aksi: '#e8914f', gambar: '#316768', prakarya: '#924c0d', puisi: '#ba1a1a', video: '#00696b' };
const TYPE_ICONS = { tulisan: '✍️', aksi: '🦸', gambar: '🖼️', prakarya: '🔧', puisi: '📜', video: '🎬' };
const EMOJI_OPTIONS = ['👍', '❤️', '🎉'];

function UploadModal({ onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '', description: '', type: 'aksi', content: '', media: null,
    });
    const badWords = [...detect(data.title), ...detect(data.description || ''), ...detect(data.content || '')];
    const blocked = badWords.length > 0;

    const submit = (e) => {
        e.preventDefault();
        if (blocked) return;
        post('/karya', { forceFormData: true, onSuccess: () => { reset(); onClose(); } });
    };

    return (
        <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-lg)' }}>
            <form onClick={(e) => e.stopPropagation()} onSubmit={submit} className="card" style={{ width: '100%', maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 'var(--space-base)', maxHeight: '90vh', overflowY: 'auto' }}>
                <h3 className="text-headline-md">Unggah Karya Baru</h3>
                <input className={`input ${detect(data.title).length ? 'input-warning' : ''}`} placeholder="Judul karya" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                {errors.title && <span style={{ color: 'var(--color-error)', fontSize: 13 }}>{errors.title}</span>}

                <select className="input" value={data.type} onChange={(e) => setData('type', e.target.value)}>
                    {Object.keys(TYPE_ICONS).map((t) => <option key={t} value={t}>{TYPE_ICONS[t]} {t}</option>)}
                </select>

                <textarea className={`input ${detect(data.content || '').length ? 'input-warning' : ''}`} placeholder="Ceritakan karyamu / isi tulisan..." rows={4} style={{ resize: 'vertical', minHeight: 90 }} value={data.content} onChange={(e) => setData('content', e.target.value)} />

                <label style={{ fontSize: 13, color: 'var(--color-outline)' }}>Foto/Video bukti (opsional, maks 20MB)</label>
                <input type="file" accept="image/*,video/*" onChange={(e) => setData('media', e.target.files[0])} />

                {blocked && (
                    <div style={{ background: 'var(--color-error-container)', color: 'var(--color-on-error-container)', padding: 'var(--space-md)', borderRadius: 'var(--rounded)', fontSize: 13 }}>
                        ⚠️ Kata tidak pantas: <strong>{badWords.join(', ')}</strong>
                    </div>
                )}

                <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'flex-end' }}>
                    <button type="button" className="btn btn-ghost" onClick={onClose}>Batal</button>
                    <button type="submit" className="btn btn-primary" disabled={processing || blocked}>Unggah</button>
                </div>
            </form>
        </div>
    );
}

export default function KaryaIndex({ works = [], myPending = 0 }) {
    const [filter, setFilter] = useState('semua');
    const [showModal, setShowModal] = useState(false);

    const filters = ['semua', 'tulisan', 'aksi', 'gambar', 'prakarya', 'puisi'];
    const filteredWorks = filter === 'semua' ? works : works.filter((w) => w.type === filter);

    return (
        <AppLayout title="Karya-Ku">
            <Head title="Karya-Ku" />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-lg)', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
                <div>
                    <h2 className="text-headline-lg">Galeri Karya-Ku 🎨</h2>
                    <p className="text-body-md" style={{ color: 'var(--color-outline)', marginTop: 4 }}>
                        Jurnal aksi nyata & ekspresi kreatifmu{myPending > 0 ? ` • ${myPending} menunggu validasi` : ''}
                    </p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Unggah Karya Baru</button>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)', flexWrap: 'wrap' }}>
                {filters.map((f) => (
                    <button key={f} className="chip" onClick={() => setFilter(f)} style={{ cursor: 'pointer', padding: '8px 16px', fontSize: 13, background: filter === f ? 'var(--color-primary)' : 'var(--color-surface-container)', color: filter === f ? 'var(--color-on-primary)' : 'var(--color-on-surface-variant)' }}>
                        {f === 'semua' ? '📋 Semua' : `${TYPE_ICONS[f]} ${f.charAt(0).toUpperCase() + f.slice(1)}`}
                    </button>
                ))}
            </div>

            {filteredWorks.length === 0 && (
                <p style={{ color: 'var(--color-outline)', fontSize: 14 }}>Belum ada karya di kategori ini. Ayo jadi yang pertama!</p>
            )}

            <div className="grid grid-cols-3" style={{ gap: 'var(--space-base)' }}>
                {filteredWorks.map((work) => (
                    <div key={work.id} className="card card-elevated" style={{ overflow: 'hidden', padding: 0 }}>
                        <div style={{ height: 120, background: work.media_url ? `url(${work.media_url}) center/cover` : `linear-gradient(135deg, ${TYPE_COLORS[work.type]}40, ${TYPE_COLORS[work.type]}15)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
                            {!work.media_url && (TYPE_ICONS[work.type] || '🎨')}
                        </div>
                        <div style={{ padding: 'var(--space-base)' }}>
                            <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                                <span className="chip" style={{ background: (TYPE_COLORS[work.type] || '#5fb7b9') + '20', color: TYPE_COLORS[work.type] || '#5fb7b9', fontSize: 11 }}>
                                    {TYPE_ICONS[work.type]} {work.type}
                                </span>
                                <span className="chip" style={{ background: '#e6f7e6', color: '#2d7a2d', fontSize: 11 }}>✅ Disetujui</span>
                            </div>
                            <h4 style={{ fontWeight: 600, fontSize: 15, marginBottom: 'var(--space-xs)' }}>{work.title}</h4>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
                                <span style={{ fontSize: 18 }}>🧑‍🎓</span>
                                <span style={{ fontSize: 13, color: 'var(--color-outline)' }}>{work.author}</span>
                                {work.points > 0 && <span style={{ marginLeft: 'auto', fontWeight: 700, fontSize: 13, color: 'var(--color-secondary)' }}>+{work.points} Poin</span>}
                            </div>
                            <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                                {EMOJI_OPTIONS.map((emoji) => (
                                    <button key={emoji} onClick={() => router.post(`/karya/${work.id}/react`, { emoji }, { preserveScroll: true })} style={{ display: 'flex', alignItems: 'center', gap: 3, padding: '4px 10px', borderRadius: 'var(--rounded-full)', background: 'var(--color-surface-container)', fontSize: 13, cursor: 'pointer' }}>
                                        {emoji}
                                    </button>
                                ))}
                                <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--color-outline)', alignSelf: 'center' }}>❤️ {work.reactions} apresiasi</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && <UploadModal onClose={() => setShowModal(false)} />}
        </AppLayout>
    );
}
