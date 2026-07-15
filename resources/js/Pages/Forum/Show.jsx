import { Head, router, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import SpeakButton from '@/Components/SpeakButton';
import { detect } from '@/lib/profanity';

const EMOJI_OPTIONS = ['👍', '❤️', '🎉'];
const AVATARS = { guru: '👩‍🏫', admin: '🛠️', siswa: '🧑‍🎓' };

function ReplyCard({ reply }) {
    const isTeacher = reply.role === 'guru';
    return (
        <div
            className="card"
            style={{
                padding: 'var(--space-base) var(--space-lg)',
                borderLeft: isTeacher ? '4px solid var(--color-primary)' : 'none',
                background: isTeacher ? 'var(--color-primary-fixed)' : undefined,
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-sm)' }}>
                <span style={{ fontSize: 28 }}>{AVATARS[reply.role] || '🧑‍🎓'}</span>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                        <span style={{ fontWeight: 600, fontSize: 14 }}>{reply.author}</span>
                        {isTeacher && (
                            <span className="chip" style={{ background: 'var(--color-primary)', color: 'white', fontSize: 10, padding: '2px 8px' }}>Guru</span>
                        )}
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--color-outline)' }}>{reply.time}</span>
                </div>
                <SpeakButton text={reply.body} />
            </div>
            <p style={{ fontSize: 15, lineHeight: '24px', marginBottom: 'var(--space-md)' }}>{reply.body}</p>
            {reply.voice_url && <audio controls src={reply.voice_url} style={{ marginBottom: 'var(--space-md)', width: '100%' }} />}
            <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                {EMOJI_OPTIONS.map((emoji) => (
                    <button
                        key={emoji}
                        onClick={() => router.post(`/forum/replies/${reply.id}/react`, { emoji }, { preserveScroll: true })}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px',
                            borderRadius: 'var(--rounded-full)',
                            background: reply.reactions?.[emoji] ? 'var(--color-primary-fixed)' : 'var(--color-surface-container)',
                            fontSize: 13,
                        }}
                    >
                        {emoji} {reply.reactions?.[emoji] ? <span style={{ fontWeight: 600, fontSize: 12 }}>{reply.reactions[emoji]}</span> : null}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default function ForumShow({ thread, replies = [] }) {
    const { data, setData, post, processing, reset } = useForm({ body: '' });
    const badWords = detect(data.body);
    const blocked = badWords.length > 0;

    const submit = (e) => {
        e.preventDefault();
        if (blocked || !data.body.trim()) return;
        post(`/forum/${thread.id}/replies`, { preserveScroll: true, onSuccess: () => reset() });
    };

    return (
        <AppLayout title="Diskusi Forum">
            <Head title={`${thread.title} - Forum`} />

            {/* Thread Header */}
            <div style={{ background: `linear-gradient(135deg, ${thread.color || '#5fb7b9'} 0%, #7eb3b4 100%)`, borderRadius: 'var(--rounded-lg)', padding: 'var(--space-lg)', color: 'white', marginBottom: 'var(--space-lg)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                    <span className="chip" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>{thread.icon} {thread.category}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)' }}>
                    <h2 style={{ fontSize: 22, fontWeight: 700, flex: 1 }}>{thread.title}</h2>
                    <SpeakButton text={`${thread.title}. ${thread.body}`} size={36} />
                </div>
                <p style={{ fontSize: 15, opacity: 0.95, marginTop: 8 }}>{thread.body}</p>
                <p style={{ fontSize: 13, opacity: 0.85, marginTop: 8 }}>
                    Dibuat oleh {thread.author} • {thread.time} • {replies.length} balasan
                </p>
            </div>

            {/* Replies */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-base)', marginBottom: 'var(--space-lg)' }}>
                {replies.length === 0 && (
                    <p style={{ color: 'var(--color-outline)', fontSize: 14 }}>Belum ada balasan. Jadilah yang pertama membantu!</p>
                )}
                {replies.map((reply) => <ReplyCard key={reply.id} reply={reply} />)}
            </div>

            {/* Compose */}
            {thread.is_locked ? (
                <div className="card" style={{ textAlign: 'center', color: 'var(--color-outline)' }}>🔒 Diskusi ini telah dikunci oleh guru.</div>
            ) : (
                <form
                    onSubmit={submit}
                    className="card"
                    style={{ position: 'sticky', bottom: 'var(--space-lg)', padding: 'var(--space-base)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', boxShadow: 'var(--shadow-lg)' }}
                >
                    <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'flex-end' }}>
                        <button type="button" className="btn btn-ghost" style={{ width: 44, height: 44, borderRadius: 'var(--rounded-full)', fontSize: 20, flexShrink: 0 }} title="Balas dengan suara (segera hadir)">🎤</button>
                        <input
                            className={`input ${blocked ? 'input-warning' : ''}`}
                            style={{ minHeight: 44, flex: 1 }}
                            placeholder="Tulis balasan..."
                            value={data.body}
                            onChange={(e) => setData('body', e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary" style={{ height: 44, flexShrink: 0 }} disabled={processing || blocked}>Kirim</button>
                    </div>
                    {blocked && (
                        <span style={{ color: 'var(--color-error)', fontSize: 13 }}>
                            ⚠️ Kata tidak pantas terdeteksi: <strong>{badWords.join(', ')}</strong>
                        </span>
                    )}
                </form>
            )}
        </AppLayout>
    );
}
