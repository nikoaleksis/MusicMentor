import { useEffect, useRef, useState, useCallback } from "react";
import WaveformVisualizer from "./components/WaveFormVisualizer";
import FrequencySpectrumVisualizer from "./components/FrequencySpectrumVisualizerComponent";
import { YinFrequencyStrategy } from "./audio/YinFrequencyStrategy";
import { RMSAmplitudeStrategy } from "./audio/RMSAmplitudeStrategy";
import { AudioProcessor } from "./audio/AudioProcessor";

const frequencyStrategy = new YinFrequencyStrategy();
const amplitudeStrategy = new RMSAmplitudeStrategy();
const audioProcessor = new AudioProcessor(frequencyStrategy, amplitudeStrategy);

async function requestMicrophone(): Promise<MediaStream>  {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true})

    return stream;
  } catch(error) {
    console.error("ERROR " + error);

    alert("You need to grant access to microphone to use this application");

    return Promise.reject();
  }
}

function AudioTestComponent() {
  const analyser = useRef<AnalyserNode | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const mediaStreamSource = useRef<MediaStreamAudioSourceNode | null>(null);
  const [currentFrequency, setCurrentFrequency] = useState<number>(0);
  const [currentAmplitude, setCurrentAmplitude] = useState<number>(0);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const initializeAudioResources = useCallback(async () => {
    const microphone = await requestMicrophone();

    if (!microphone) return;

    audioContext.current = audioContext.current || new AudioContext();
    mediaStreamSource.current = mediaStreamSource.current || audioContext.current.createMediaStreamSource(microphone);
    analyser.current = analyser.current || audioContext.current.createAnalyser();
    analyser.current.fftSize = 2048;
    mediaStreamSource.current.connect(analyser.current);

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    initializeAudioResources();
  }, [initializeAudioResources]);

  useEffect(() => {
    if (!isInitialized) return;

    const updateAudioData = function() {
      if (analyser.current && audioContext.current) {
        const amplitude = audioProcessor.calculateAmplitude(analyser.current);
        const frequency = audioProcessor.calculateFrequency(audioContext.current, analyser.current) ?? 0;

        setCurrentFrequency(frequency);
        setCurrentAmplitude(amplitude);

      requestAnimationFrame(updateAudioData)
    }
    }

    requestAnimationFrame(updateAudioData);
  }, [isInitialized]);

  return (
    <>
      { currentFrequency && <div>Current frequency: { currentFrequency } Hz</div> }
      { currentAmplitude && <div>Current Amplitude: { currentAmplitude }</div> }
      
      <h1>Wave Form</h1>
      <WaveformVisualizer analyser={analyser.current} />

      <h1>Frequency Spectrum</h1>
      <FrequencySpectrumVisualizer analyser={analyser.current} /> {/* Add this */}

      {/*<CumulativeDifferenceGraph data={cumulativeDifference.current} />*/}
      {/*<TestFrequencyComponent />*/}
    </>
  )
}

export default AudioTestComponent;