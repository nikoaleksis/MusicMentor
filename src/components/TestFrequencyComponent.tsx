import React, { useState, useRef } from 'react';

const EXPECTED_FREQUENCY = 329.63;

const TestFrequencyComponent: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioContextRef = useRef(new AudioContext());
    const oscillatorRef = useRef<OscillatorNode | null>(null);

    const toggleSound = () => {
        if (isPlaying) {
            // Stop the sound
            if (oscillatorRef.current) {
                oscillatorRef.current.stop();
                oscillatorRef.current = null;
            }
        } else {
            // Start the sound
            const oscillator = audioContextRef.current.createOscillator();
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(EXPECTED_FREQUENCY, audioContextRef.current.currentTime);
            oscillator.connect(audioContextRef.current.destination);
            oscillator.start();
            oscillatorRef.current = oscillator;
        }

        setIsPlaying(!isPlaying);
    };

    return <button onClick={toggleSound}>{isPlaying ? 'Stop' : 'Play'}</button>;
};

export default TestFrequencyComponent;