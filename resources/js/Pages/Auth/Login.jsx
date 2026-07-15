import { Head, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <>
            <Head title="Masuk" />
            <div
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-tertiary) 50%, var(--color-surface) 100%)',
                    padding: 'var(--space-lg)',
                }}
            >
                <div
                    className="card card-elevated animate-slide-up"
                    style={{
                        width: '100%',
                        maxWidth: 440,
                        padding: 'var(--space-xl)',
                        textAlign: 'center',
                    }}
                >
                    {/* Logo */}
                    <div
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: 'var(--rounded-md)',
                            background: 'var(--color-primary)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 28,
                            fontWeight: 800,
                            margin: '0 auto var(--space-base)',
                        }}
                    >
                        B
                    </div>
                    <h1 className="text-headline-lg" style={{ marginBottom: 4 }}>Selamat Datang!</h1>
                    <p className="text-body-md" style={{ color: 'var(--color-outline)', marginBottom: 'var(--space-xl)' }}>
                        Masuk ke platform BINA
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: 'var(--space-base)', textAlign: 'left' }}>
                            <label className="text-label-md" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>Email</label>
                            <input
                                className={`input ${errors.email ? 'input-error' : ''}`}
                                type="email"
                                placeholder="nama@sekolah.sch.id"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && <div style={{ color: 'var(--color-error)', fontSize: 12, marginTop: 4 }}>{errors.email}</div>}
                        </div>

                        <div style={{ marginBottom: 'var(--space-lg)', textAlign: 'left' }}>
                            <label className="text-label-md" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>Kata Sandi</label>
                            <input
                                className={`input ${errors.password ? 'input-error' : ''}`}
                                type="password"
                                placeholder="Masukkan kata sandi"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            {errors.password && <div style={{ color: 'var(--color-error)', fontSize: 12, marginTop: 4 }}>{errors.password}</div>}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg w-full"
                            disabled={processing}
                            style={{ marginBottom: 'var(--space-base)' }}
                        >
                            {processing ? 'Memproses...' : 'Masuk'}
                        </button>

                        <p style={{ fontSize: 14, color: 'var(--color-outline)' }}>
                            Belum punya akun? <a href="/register" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Daftar</a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}
