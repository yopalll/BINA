import { useMemo, useState, useCallback } from 'react';
import { hasProfanity, detect } from '@/lib/profanity';

/**
 * First-layer (client-side, non-AI) toxicity guard for text inputs.
 * Detects profanity instantly as the user types, before anything is sent
 * to the server — protecting AI quota and keeping the forum clean.
 *
 * Usage:
 *   const { value, setValue, isDirty, badWords, onChange } = useProfanityFilter();
 */
export function useProfanityFilter(initial = '') {
    const [value, setValue] = useState(initial);

    const badWords = useMemo(() => detect(value), [value]);
    const isDirty = badWords.length > 0;

    const onChange = useCallback((e) => {
        setValue(typeof e === 'string' ? e : e.target.value);
    }, []);

    return { value, setValue, onChange, isDirty, badWords, hasProfanity: () => hasProfanity(value) };
}
