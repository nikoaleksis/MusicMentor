import React, { useRef, useEffect } from 'react';

type WaveformVisualizerProps = {
    analyser: AnalyserNode | null;
};

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({ analyser }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !analyser) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        const data = new Uint8Array(analyser.frequencyBinCount);
        
        const draw = () => {
            requestAnimationFrame(draw);
            
            analyser.getByteTimeDomainData(data);

            context.fillStyle = 'white';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.strokeStyle = 'black';
            context.beginPath();

            const sliceWidth = canvas.width / data.length;
            let x = 0;
            for (let i = 0; i < data.length; i++) {
                const v = data[i] / 128;
                const y = v * canvas.height / 2;

                if (i === 0) {
                    context.moveTo(x, y);
                } else {
                    context.lineTo(x, y);
                }

                x += sliceWidth;
            }

            context.lineTo(canvas.width, canvas.height / 2);
            context.stroke();
        };
        
        draw();
    }, [analyser]);

    return <canvas ref={canvasRef} />;
};

export default WaveformVisualizer;