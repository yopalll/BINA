import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const NAV_ITEMS = [
    { name: 'Dashboard', href: '/', icon: '🏠' },
    { name: 'Belajar Bareng', href: '/forum', icon: '💬' },
    { name: 'Karya-Ku', href: '/karya', icon: '🎨' },
    { name: 'Battle HOTS', href: '/battle', icon: '⚔️' },
    { name: 'Leaderboard', href: '/leaderboard', icon: '🏆' },
    { name: 'Dengar & Baca', href: '/aksesibilitas', icon: '🔊' },
    { name: 'Offline Sync', href: '/offline', icon: '📶' },
];

export default function AppLayout({ children, title }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const currentUrl = usePage().url;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-surface)' }}>
            {/* Sidebar */}
            <aside
                style={{
                    width: sidebarOpen ? 260 : 72,
                    background: 'var(--color-surface-container-lowest)',
                    borderRight: '1px solid var(--color-outline-variant)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'width var(--transition-base)',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '100vh',
                    zIndex: 50,
                    overflow: 'hidden',
                }}
            >
                {/* Logo */}
                <div
                    style={{
                        padding: 'var(--space-base)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-md)',
                        borderBottom: '1px solid var(--color-outline-variant)',
                        minHeight: 64,
                    }}
                >
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 'var(--rounded)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'var(--color-primary)',
                            color: 'var(--color-on-primary)',
                            fontWeight: 700,
                            fontSize: 18,
                            flexShrink: 0,
                        }}
                    >
                        B
                    </button>
                    {sidebarOpen && (
                        <span
                            style={{
                                fontWeight: 700,
                                fontSize: 20,
                                color: 'var(--color-primary)',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            BINA
                        </span>
                    )}
                </div>

                {/* Nav Items */}
                <nav style={{ flex: 1, padding: 'var(--space-sm)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {NAV_ITEMS.map((item) => {
                        const isActive = currentUrl === item.href || currentUrl.startsWith(item.href + '/');
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--space-md)',
                                    padding: sidebarOpen ? '12px 16px' : '12px',
                                    borderRadius: 'var(--rounded)',
                                    background: isActive ? 'var(--color-primary-fixed)' : 'transparent',
                                    color: isActive ? 'var(--color-on-primary-fixed)' : 'var(--color-on-surface-variant)',
                                    fontWeight: isActive ? 600 : 400,
                                    fontSize: 14,
                                    transition: 'all var(--transition-fast)',
                                    textDecoration: 'none',
                                    justifyContent: sidebarOpen ? 'flex-start' : 'center',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                                {sidebarOpen && <span>{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Section */}
                <div
                    style={{
                        padding: 'var(--space-base)',
                        borderTop: '1px solid var(--color-outline-variant)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-md)',
                    }}
                >
                    <div className="avatar avatar-md">
                        {auth?.user?.name?.charAt(0) || 'U'}
                    </div>
                    {sidebarOpen && (
                        <div style={{ overflow: 'hidden' }}>
                            <div style={{ fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap' }}>
                                {auth?.user?.name || 'Pengguna'}
                            </div>
                            <div style={{ fontSize: 12, color: 'var(--color-outline)', whiteSpace: 'nowrap' }}>
                                {auth?.user?.role || 'Siswa'}
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main
                style={{
                    flex: 1,
                    marginLeft: sidebarOpen ? 260 : 72,
                    transition: 'margin-left var(--transition-base)',
                    minHeight: '100vh',
                }}
            >
                {/* Top Bar */}
                <header
                    style={{
                        height: 64,
                        background: 'var(--color-surface-container-lowest)',
                        borderBottom: '1px solid var(--color-outline-variant)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 var(--space-lg)',
                        position: 'sticky',
                        top: 0,
                        zIndex: 40,
                    }}
                >
                    <h1 style={{ fontSize: 20, fontWeight: 600, lineHeight: '28px' }}>
                        {title || 'BINA'}
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                        <button
                            className="btn-ghost"
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 'var(--rounded-full)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 20,
                                position: 'relative',
                            }}
                        >
                            🔔
                            <span
                                className="badge"
                                style={{
                                    position: 'absolute',
                                    top: 2,
                                    right: 2,
                                    width: 8,
                                    height: 8,
                                    minWidth: 8,
                                    padding: 0,
                                }}
                            />
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <div style={{ padding: 'var(--space-lg)' }} className="animate-fade-in">
                    {children}
                </div>
            </main>
        </div>
    );
}
