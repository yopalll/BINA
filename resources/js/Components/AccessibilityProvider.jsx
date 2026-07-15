import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { usePage } from '@inertiajs/react';

const DEFAULTS = {
    high_contrast: false,
    font_scale: 1.0,
    speech_rate: 1.0,
    voice: 'perempuan',
};

const AccessibilityContext = createContext({ prefs: DEFAULTS, update: () => {} });

export function useAccessibility() {
    return useContext(AccessibilityContext);
}

/**
 * Applies accessibility preferences globally: font scaling and high-contrast
 * mode are written to the document root so the whole UI responds. Preferences
 * come from the authenticated user (shared via Inertia) with a localStorage
 * cache so the choice survives before login / offline.
 */
export default function AccessibilityProvider({ children }) {
    const page = usePage();
    const serverPrefs = page.props?.auth?.user?.accessibility_preferences;

    const [prefs, setPrefs] = useState(() => {
        const cached = typeof window !== 'undefined' ? localStorage.getItem('bina.a11y') : null;
        return { ...DEFAULTS, ...(cached ? JSON.parse(cached) : {}), ...(serverPrefs || {}) };
    });

    useEffect(() => {
        if (serverPrefs) setPrefs((p) => ({ ...p, ...serverPrefs }));
    }, [serverPrefs]);

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--a11y-font-scale', prefs.font_scale);
        root.style.fontSize = `${16 * prefs.font_scale}px`;
        root.setAttribute('data-contrast', prefs.high_contrast ? 'high' : 'normal');
        localStorage.setItem('bina.a11y', JSON.stringify(prefs));
    }, [prefs]);

    const update = useCallback((patch) => setPrefs((p) => ({ ...p, ...patch })), []);

    return (
        <AccessibilityContext.Provider value={{ prefs, update }}>
            {children}
        </AccessibilityContext.Provider>
    );
}
