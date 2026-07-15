import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import AccessibilityProvider from '@/Components/AccessibilityProvider';
import '../css/app.css';

const appName = import.meta.env.VITE_APP_NAME || 'BINA';

createInertiaApp({
    title: (title) => title ? `${title} — ${appName}` : appName,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx')
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <AccessibilityProvider>
                <App {...props} />
            </AccessibilityProvider>
        );
    },
    progress: {
        color: '#5FB7B9',
        showSpinner: true,
    },
});

// Register offline service worker (Mode Daerah 3T).
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
}
