import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { detect } from '@/lib/profanity';

const AVATARS = ['🧑‍🎓', '👩‍🎓', '🧑‍🔬', '👧', '👦'];

function NewThreadModal({ categories, onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        forum_category_id: categories[0]?.id ?? '',
        title: '',
        body: '',
    });

    const badWords = [...detect(data.title), ...detect(data.body)];
    const blocked = badWords.length > 0;

    const submit = (e) => {
        e.preventDefault();
        if (blocked) return;
        post('/forum', { onSuccess: () => { reset(); onClose(); } });
    };

    return (
        <div
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-lg)' }}
        >
            <form
                onClick={(e) => e.stopPropagation()}
                onSubmit={submit}
                className="card"
                style={{ width: '100%', maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 'var(--space-base)' }}
            >
                <h3 className="text-headline-md">Buat Topik Baru</h3>

                <select className="input" value={data.forum_category_id} onChange={(e) => setData('forum_category_id', e.target.value)}>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                    ))}
                </select>

                <input
                    className={`input ${detect(data.title).length ? 'input-warning' : ''}`}
                    placeholder="Judul topik"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                />
                {errors.title && <span style={{ color: 'var(--color-error)', fontSize: 13 }}>{errors.title}</span>}

                <textarea
                    className={`input ${detect(data.body).length ? 'input-warning' : ''}`}
                    placeholder="Tuliskan pertanyaan atau bahan diskusimu..."
                    rows={5}
                    style={{ resize: 'vertical', minHeight: 100 }}
                    value={data.body}
                    onChange={(e) => setData('body', e.target.value)}
                />

                {blocked && (
                    <div style={{ background: 'var(--color-error-container)', color: 'var(--color-on-error-container)', padding: 'var(--space-md)', borderRadius: 'var(--rounded)', fontSize: 13 }}>
                        ⚠️ Terdeteksi kata tidak pantas: <strong>{badWords.join(', ')}</strong>. Mohon perbaiki sebelum mengirim.
                    </div>
                )}

                <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'flex-end' }}>
                    <button type="button" className="btn btn-ghost" onClick={onClose}>Batal</button>
                    <button type="submit" className="btn btn-primary" disabled={processing || blocked}>Kirim Topik</button>
                </div>
            </form>
        </div>
    );
}

export default function ForumIndex({ categories = [], trending = [] }) {
    const [showModal, setShowModal] = useState(false);
    const [query, setQuery] = useState('');

    const filtered = categories.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <AppLayout title="Belajar Bareng">
            <Head title="Belajar Bareng" />

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-lg)', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
                <div>
                    <h2 className="text-headline-lg">Forum Belajar Bareng 💬</h2>
                    <p className="text-body-md" style={{ color: 'var(--color-outline)', marginTop: 4 }}>
                        Pilih mata pelajaran dan mulai diskusi bersama teman-temanmu
                    </p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Buat Topik Baru</button>
            </div>

            {/* Search Bar */}
            <div style={{ marginBottom: 'var(--space-lg)' }}>
                <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 20 }}>🔍</span>
                    <input
                        className="input"
                        placeholder="Cari mata pelajaran..."
                        style={{ paddingLeft: 48 }}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Subject Grid */}
            <h3 className="text-headline-md" style={{ marginBottom: 'var(--space-base)' }}>Mata Pelajaran</h3>
            <div className="grid grid-cols-4" style={{ gap: 'var(--space-base)', marginBottom: 'var(--space-xl)' }}>
                {filtered.map((subject) => (
                    <Link
                        key={subject.id}
                        href={`/forum?kategori=${subject.slug}`}
                        className="card card-elevated"
                        style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                    >
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: subject.color }} />
                        <div style={{ fontSize: 32, marginBottom: 'var(--space-sm)' }}>{subject.icon}</div>
                        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{subject.name}</div>
                        <div style={{ display: 'flex', gap: 'var(--space-base)', fontSize: 12, color: 'var(--color-outline)' }}>
                            <span>{subject.threads} topik</span>
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--color-outline)', marginTop: 'var(--space-sm)' }}>
                            Aktif {subject.lastActive}
                        </div>
                    </Link>
                ))}
            </div>

            {/* Trending Threads */}
            <h3 className="text-headline-md" style={{ marginBottom: 'var(--space-base)' }}>🔥 Topik Trending</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {trending.length === 0 && (
                    <p style={{ color: 'var(--color-outline)', fontSize: 14 }}>Belum ada topik. Jadilah yang pertama membuat diskusi!</p>
                )}
                {trending.map((thread, i) => (
                    <Link
                        key={thread.id}
                        href={`/forum/${thread.id}`}
                        className="card"
                        style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-base)', padding: 'var(--space-base) var(--space-lg)', cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
                    >
                        <span style={{ fontSize: 28 }}>{AVATARS[i % AVATARS.length]}</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: 15 }}>{thread.title}</div>
                            <div style={{ fontSize: 13, color: 'var(--color-outline)', marginTop: 2 }}>
                                oleh {thread.author} • {thread.subject}
                            </div>
                        </div>
                        <div className="chip">{thread.replies} balasan</div>
                    </Link>
                ))}
            </div>

            {showModal && <NewThreadModal categories={categories} onClose={() => setShowModal(false)} />}
        </AppLayout>
    );
}
