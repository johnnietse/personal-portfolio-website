"use client";

import { useState, useEffect } from 'react';

export default function Typewriter({ strings, delay = 50, eraseDelay = 30, pause = 3500 }) {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [cursorVisible, setCursorVisible] = useState(true);

    // Typing logic
    useEffect(() => {
        let timeout;

        if (!isDeleting && text === strings[index]) {
            // Pause at the end of typing
            timeout = setTimeout(() => setIsDeleting(true), pause);
        } else if (isDeleting && text === '') {
            // Move to next string and start typing
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % strings.length);
            // Brief pause before typing next word
            timeout = setTimeout(() => { }, 500);
        } else {
            // Typing or deleting effect
            const currentString = strings[index];
            const speed = isDeleting ? eraseDelay : delay;

            timeout = setTimeout(() => {
                setText(
                    isDeleting
                        ? currentString.substring(0, text.length - 1)
                        : currentString.substring(0, text.length + 1)
                );
            }, speed);
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, index, strings, delay, eraseDelay, pause]);

    // Cursor blink logic independent of typing speed
    useEffect(() => {
        const interval = setInterval(() => {
            setCursorVisible((v) => !v);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
            {text}
            <span
                style={{
                    marginLeft: '4px',
                    opacity: cursorVisible ? 1 : 0,
                    transition: 'opacity 0.1s',
                    backgroundColor: 'var(--accent-color)',
                    width: '3px',
                    height: '1.2em',
                    display: 'inline-block',
                    position: 'relative',
                    top: '0.1em'
                }}
            />
        </span>
    );
}
