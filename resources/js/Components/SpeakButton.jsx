import { useState, useRef } from 'react';

/**
 * Accessibility TTS button. Tries the server (Azure GadisNeural) first; if the
 * server has no credentials it returns 204 and we fall back to the browser's
 * built-in Web Speech API. Reads speech rate from accessibility preferences.
 */
export default function SpeakButton({ text, rate = 1, size = 32, title = 'Dengarkan' }) {
    const [state, setState] = useState('idle'); // idle | loading | playing
    const audioRef = useRef(null);

    const stop = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
        window.speechSynthesis?.cancel();
        setState('idle');
    };

    const speakBrowser = () => {
        if (!('speechSynthesis' in window)) {
            setState('idle');
            return;
        }
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'id-ID';
        utter.rate = rate;
        const idVoice = window.speechSynthesis.getVoices().find((v) => v.lang?.startsWith('id'));
        if (idVoice) utter.voice = idVoice;
        utter.onend = () => setState('idle');
        utter.onerror = () => setState('idle');
        window.speechSynthesis.speak(utter);
        setState('playing');
    };

    const speak = async () => {
        if (state === 'playing' || state === 'loading') {
            stop();
            return;
        }
        if (!text?.trim()) return;

        setState('loading');
        try {
            const res = await fetch('/tts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
                    Accept: 'audio/mpeg',
                },
                body: JSON.stringify({ text }),
            });

            if (res.status === 204 || !res.headers.get('content-type')?.includes('audio')) {
                speakBrowser();
                return;
            }

            const blob = await res.blob();
            const audio = new Audio(URL.createObjectURL(blob));
            audio.playbackRate = rate;
            audio.onended = () => setState('idle');
            audioRef.current = audio;
            await audio.play();
            setState('playing');
        } catch {
            speakBrowser();
        }
    };

    return (
        <button
            type="button"
            onClick={speak}
            title={title}
            aria-label={title}
            className="btn-ghost"
            style={{
                width: size,
                height: size,
                minWidth: size,
                borderRadius: 'var(--rounded-full)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: size * 0.5,
                cursor: 'pointer',
                flexShrink: 0,
            }}
        >
            {state === 'loading' ? '⏳' : state === 'playing' ? '⏹️' : '🔊'}
        </button>
    );
}
