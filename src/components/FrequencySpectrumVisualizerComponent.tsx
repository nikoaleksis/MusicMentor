import { useEffect, useRef } from "react";

function FrequencySpectrumVisualizer({ analyser }: { analyser: AnalyserNode | null }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    if (!analyser || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function draw() {
      if (!analyser) return;
      if (!ctx) return;

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";

      const sliceWidth = (canvas.width / dataArray.length);
      let x = 0;

      for (let i = 0; i < dataArray.length; i++) {
        const v = dataArray[i] / 256;
        const y = canvas.height - (v * canvas.height);
        ctx.fillStyle = 'red';
        ctx.fillRect(x, y, sliceWidth, canvas.height - y);
        x += sliceWidth;

                // Detecting peaks (bars taller than their neighbors)
                if (dataArray[i] > dataArray[i - 1] && dataArray[i] > dataArray[i + 1]) {
                  const frequency = Math.round(i * analyser.context.sampleRate / (2 * analyser.fftSize));
                  ctx.fillStyle = "blue";
                  ctx.fillText(`${frequency}Hz`, x, y - 5);  // display frequency above the peak
                }
      }

      requestAnimationFrame(draw);
    }
    
    draw();
  }, [analyser]);

  return <canvas ref={canvasRef} width="800" height="256" />;
}

export default FrequencySpectrumVisualizer;