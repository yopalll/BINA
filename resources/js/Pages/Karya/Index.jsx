import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useState } from 'react';

const MOCK_WORKS = [
    { id: 1, title: 'Puisi: Alam yang Indah', type: 'tulisan', author: 'Sari A.', avatar: '👩‍🎓', image: null, reactions: { '👍': 12, '❤️': 8, '🎉': 5 }, status: 'approved', points: 15 },
    { id: 2, title: 'Aksi: Menegur Penyebar Hoaks', type: 'aksi', author: 'Budi S.', avatar: '🧑‍🎓', image: null, reactions: { '👍': 23, '❤️': 15, '🎉': 10 }, status: 'approved', points: 25 },
    { id: 3, title: 'Gambar: Pahlawan Favoritku', type: 'gambar', author: 'Rina K.', avatar: '👧', image: null, reactions: { '👍': 7, '❤️': 4, '🎉': 2 }, status: 'pending', points: 0 },
    { id: 4, title: 'Aksi: Membersihkan Taman Sekolah', type: 'aksi', author: 'Andi R.', avatar: '🧑‍🔬', image: null, reactions: { '👍': 31, '❤️': 20, '🎉': 14 }, status: 'approved', points: 30 },
    { id: 5, title: 'Prakarya: Celengan dari Botol Bekas', type: 'prakarya', author: 'Dewi L.', avatar: '👩‍🎨', image: null, reactions: { '👍': 18, '❤️': 11, '🎉': 7 }, status: 'approved', points: 20 },
    { id: 6, title: 'Tulisan: Cerita tentang Gotong Royong', type: 'tulisan', author: 'Fajar M.', avatar: '🧑‍💻', image: null, reactions: { '👍': 9, '❤️': 6, '🎉': 3 }, status: 'pending', points: 0 },
];

const TYPE_COLORS = {
    tulisan: '#5fb7b9',
    aksi: '#e8914f',
    gambar: '#316768',
    prakarya: '#924c0d',
};

const TYPE_ICONS = {
    tulisan: '✍️',
    aksi: '🦸',
    gambar: '🖼️',
    prakarya: '🔧',
};

const EMOJI_OPTIONS = ['👍', '❤️', '🎉'];

export default function KaryaIndex() {
    const [filter, setFilter] = useState('semua');

    const filters = ['semua', 'tulisan', 'aksi', 'gambar', 'prakarya'];
    const filteredWorks = filter === 'semua' ? MOCK_WORKS : MOCK_WORKS.filter(w => w.type === filter);

    return (
        <AppLayout title="Karya-Ku">
            <Head title="Karya-Ku" />

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-lg)' }}>
                <div>
                    <h2 className="text-headline-lg">Galeri Karya-Ku 🎨</h2>
                    <p className="text-body-md" style={{ color: 'var(--color-outline)', marginTop: 4 }}>
                        Jurnal aksi nyata & ekspresi kreatifmu
                    </p>
                </div>
                <button className="btn btn-primary">+ Unggah Karya Baru</button>
            </div>

            {/* Filter Chips */}
            <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)', flexWrap: 'wrap' }}>
                {filters.map((f) => (
                    <button
                        key={f}
                        className="chip"
                        onClick={() => setFilter(f)}
                        style={{
                            cursor: 'pointer',
                            padding: '8px 16px',
                            fontSize: 13,
                            background: filter === f ? 'var(--color-primary)' : 'var(--color-surface-container)',
                            color: filter === f ? 'var(--color-on-primary)' : 'var(--color-on-surface-variant)',
                            transition: 'all var(--transition-fast)',
                        }}
                    >
                        {f === 'semua' ? '📋 Semua' : `${TYPE_ICONS[f]} ${f.charAt(0).toUpperCase() + f.slice(1)}`}
                    </button>
                ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-3" style={{ gap: 'var(--space-base)' }}>
                {filteredWorks.map((work) => (
                    <div key={work.id} className="card card-elevated" style={{ overflow: 'hidden', padding: 0 }}>
                        {/* Card Header Color Bar */}
                        <div
                            style={{
                                height: 120,
                                background: `linear-gradient(135deg, ${TYPE_COLORS[work.type]}40, ${TYPE_COLORS[work.type]}15)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 48,
                            }}
                        >
                            {TYPE_ICONS[work.type]}
                        </div>

                        <div style={{ padding: 'var(--space-base)' }}>
                            {/* Status & Type */}
                            <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                                <span
                                    className="chip"
                                    style={{
                                        background: TYPE_COLORS[work.type] + '20',
                                        color: TYPE_COLORS[work.type],
                                        fontSize: 11,
                                    }}
                                >
                                    {TYPE_ICONS[work.type]} {work.type}
                                </span>
                                <span
                                    className="chip"
                                    style={{
                                        background: work.status === 'approved' ? '#e6f7e6' : '#fff3e6',
                                        color: work.status === 'approved' ? '#2d7a2d' : '#b36b00',
                                        fontSize: 11,
                                    }}
                                >
                                    {work.status === 'approved' ? '✅ Disetujui' : '⏳ Menunggu'}
                                </span>
                            </div>

                            <h4 style={{ fontWeight: 600, fontSize: 15, marginBottom: 'var(--space-xs)' }}>{work.title}</h4>

                            {/* Author */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
                                <span style={{ fontSize: 18 }}>{work.avatar}</span>
                                <span style={{ fontSize: 13, color: 'var(--color-outline)' }}>{work.author}</span>
                                {work.points > 0 && (
                                    <span style={{ marginLeft: 'auto', fontWeight: 700, fontSize: 13, color: 'var(--color-secondary)' }}>
                                        +{work.points} Poin
                                    </span>
                                )}
                            </div>

                            {/* Emoji Reactions (No comments - anti cyberbullying) */}
                            <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                                {EMOJI_OPTIONS.map((emoji) => (
                                    <button
                                        key={emoji}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 3,
                                            padding: '4px 10px',
                                            borderRadius: 'var(--rounded-full)',
                                            background: work.reactions[emoji] ? 'var(--color-primary-fixed)' : 'var(--color-surface-container)',
                                            fontSize: 13,
                                            transition: 'all var(--transition-fast)',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {emoji}
                                        <span style={{ fontWeight: 600, fontSize: 11 }}>{work.reactions[emoji] || 0}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
