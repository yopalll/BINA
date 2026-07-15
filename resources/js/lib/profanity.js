import badwords from 'indonesian-badwords';

// Normalise common leetspeak / camouflage so filters catch "b4b1", "a n j i n g", etc.
const LEET_MAP = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '@': 'a', '$': 's' };

function normalize(text) {
    return text
        .toLowerCase()
        .replace(/[013457@$]/g, (c) => LEET_MAP[c] || c)
        .replace(/(.)\1{2,}/g, '$1$1') // collapse elongated chars: "anjiiing" -> "anjiing"
        .replace(/[.\-_*\s]+/g, ' ');
}

/** O(1)-ish instant check: does the text contain profanity? */
export function hasProfanity(text) {
    if (!text || typeof text !== 'string') return false;
    try {
        return badwords.flag(text) || badwords.flag(normalize(text));
    } catch {
        return false;
    }
}

/** Return the list of detected bad words (original + normalized pass). */
export function detect(text) {
    if (!text || typeof text !== 'string') return [];
    try {
        const found = new Set([...badwords.badwords(text), ...badwords.badwords(normalize(text))]);
        return [...found];
    } catch {
        return [];
    }
}

/** Replace detected profanity with a mask. */
export function censor(text, replacement = '***') {
    if (!text || typeof text !== 'string') return text;
    try {
        return badwords.censor(text, replacement);
    } catch {
        return text;
    }
}
