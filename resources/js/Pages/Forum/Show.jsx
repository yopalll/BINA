import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useState } from 'react';

const MOCK_MESSAGES = [
    {
        id: 1, author: 'Budi Santoso', avatar: '🧑‍🎓', role: 'Siswa',
        content: 'Kak, ada yang bisa bantu jelaskan cara menghitung luas trapesium? Aku masih bingung sama rumusnya 😅',
        time: '10:32', reactions: { '👍': 3, '❤️': 1 },
    },
    {
        id: 2, author: 'Sari Andriani', avatar: '👩‍🎓', role: 'Siswa',
        content: 'Hai Budi! Rumusnya itu L = ½ × (a + b) × t, di mana a dan b itu sisi sejajar, dan t itu tingginya. Gampang kok kalau udah paham!',
        time: '10:35', reactions: { '👍': 5, '🎉': 2 },
    },
    {
        id: 3, author: 'Pak Ahmad', avatar: '👨‍🏫', role: 'Guru',
        content: 'Bagus sekali penjelasan Sari! Untuk lebih jelasnya, coba bayangkan trapesium itu sebagai gabungan segitiga dan persegi panjang. Nanti Bapak buatkan ilustrasinya ya.',
        time: '10:38', reactions: { '👍': 8, '❤️': 4, '🎉': 3 },
        isTeacher: true,
    },
    {
        id: 4, author: 'Rina Kusuma', avatar: '👧', role: 'Siswa',
        content: 'Makasih Pak Ahmad dan Kak Sari! Aku juga terbantu nih. Ternyata gampang ya kalau dijelasin kayak gitu 🙏',
        time: '10:42', reactions: { '❤️': 2 },
    },
];

const EMOJI_OPTIONS = ['👍', '❤️', '🎉'];

export default function ForumShow() {
    const [newMessage, setNewMessage] = useState('');

    return (
        <AppLayout title="Diskusi Forum">
            <Head title="Diskusi - Matematika" />

            {/* Thread Header */}
            <div
                style={{
                    background: 'linear-gradient(135deg, #5fb7b9 0%, #7eb3b4 100%)',
                    borderRadius: 'var(--rounded-lg)',
                    padding: 'var(--space-lg)',
                    color: 'white',
                    marginBottom: 'var(--space-lg)',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                    <span className="chip" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>📐 Matematika</span>
                    <span className="chip" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>Geometri</span>
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 700 }}>Cara mudah memahami luas trapesium</h2>
                <p style={{ fontSize: 14, opacity: 0.9, marginTop: 4 }}>
                    Dibuat oleh Budi Santoso • 4 balasan • 12 peserta aktif
                </p>
            </div>

            {/* Messages */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-base)', marginBottom: 'var(--space-lg)' }}>
                {MOCK_MESSAGES.map((msg) => (
                    <div
                        key={msg.id}
                        className="card"
                        style={{
                            padding: 'var(--space-base) var(--space-lg)',
                            borderLeft: msg.isTeacher ? '4px solid var(--color-primary)' : 'none',
                            background: msg.isTeacher ? 'var(--color-primary-fixed)' : undefined,
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-sm)' }}>
                            <span style={{ fontSize: 28 }}>{msg.avatar}</span>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                    <span style={{ fontWeight: 600, fontSize: 14 }}>{msg.author}</span>
                                    {msg.isTeacher && (
                                        <span className="chip" style={{ background: 'var(--color-primary)', color: 'white', fontSize: 10, padding: '2px 8px' }}>
                                            Guru
                                        </span>
                                    )}
                                </div>
                                <span style={{ fontSize: 12, color: 'var(--color-outline)' }}>{msg.time}</span>
                            </div>
                        </div>
                        <p style={{ fontSize: 15, lineHeight: '24px', marginBottom: 'var(--space-md)' }}>{msg.content}</p>
                        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                            {EMOJI_OPTIONS.map((emoji) => (
                                <button
                                    key={emoji}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 4,
                                        padding: '4px 10px',
                                        borderRadius: 'var(--rounded-full)',
                                        background: msg.reactions[emoji] ? 'var(--color-primary-fixed)' : 'var(--color-surface-container)',
                                        fontSize: 13,
                                        transition: 'all var(--transition-fast)',
                                    }}
                                >
                                    {emoji} {msg.reactions[emoji] && <span style={{ fontWeight: 600, fontSize: 12 }}>{msg.reactions[emoji]}</span>}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Compose */}
            <div
                className="card"
                style={{
                    position: 'sticky',
                    bottom: 'var(--space-lg)',
                    padding: 'var(--space-base)',
                    display: 'flex',
                    gap: 'var(--space-sm)',
                    alignItems: 'flex-end',
                    boxShadow: 'var(--shadow-lg)',
                }}
            >
                <button
                    className="btn btn-ghost"
                    style={{ width: 44, height: 44, borderRadius: 'var(--rounded-full)', fontSize: 20, flexShrink: 0 }}
                    title="Balas dengan suara"
                >
                    🎤
                </button>
                <input
                    className="input"
                    style={{ minHeight: 44, flex: 1 }}
                    placeholder="Tulis balasan..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className="btn btn-primary" style={{ height: 44, flexShrink: 0 }}>
                    Kirim
                </button>
            </div>
        </AppLayout>
    );
}
