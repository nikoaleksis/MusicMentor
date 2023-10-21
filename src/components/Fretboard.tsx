import Fret from "./Fret";
import StringComponent from "./StringComponent";
import { useEffect, useRef, useState, useCallback } from "react";
import { RosewoodPattern, roseWoodFill } from "./RosewoodPattern";
import PitchComponent from "./PitchComponent";
import { Pitch } from "../music/Pitch";
import { YinFrequencyStrategy } from "../audio/YinFrequencyStrategy";
import { RMSAmplitudeStrategy } from "../audio/RMSAmplitudeStrategy";
import { AudioProcessor } from "../audio/AudioProcessor";

type FretboardProps = {
  stringPitches: Pitch[];
  amountOfFrets: number;
  height: number;
  width:number;
};

const frequencyStrategy = new YinFrequencyStrategy();
const amplitudeStrategy = new RMSAmplitudeStrategy();
const audioProcessor = new AudioProcessor(frequencyStrategy, amplitudeStrategy);

function Fretboard(props: FretboardProps) { 
  const analyser = useRef<AnalyserNode | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const mediaStreamSource = useRef<MediaStreamAudioSourceNode | null>(null);
  const [currentFrequency, setCurrentFrequency] = useState<number>(0);
  const [isInitialized, setIsInitialized] = useState<boolean>(false); 
  const firstFretHorizontalPosition = 50;
  const firstStringVerticalPosition = 5;

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
        const frequency = audioProcessor.calculateFrequency(audioContext.current, analyser.current) ?? 0;

        setCurrentFrequency(frequency);
        console.log(frequency + "Hz");
      requestAnimationFrame(updateAudioData)
    }
    }

    requestAnimationFrame(updateAudioData);
  }, [isInitialized]);

  const availableHorizontalSpace = props.width - firstFretHorizontalPosition;
  const availableVerticalSpace = props.height - (firstStringVerticalPosition * 2);
  
  const spaceBetweenFrets = availableHorizontalSpace / (props.amountOfFrets);
  const nrOfSpacesBetweenStrings = props.stringPitches.length - 1;
  // Todo: Magic number 3 refers to height of string rect element used for correct bottom margin from fretboard to string
  const spaceBetweenStrings = (availableVerticalSpace - 3) / nrOfSpacesBetweenStrings;

  return (
    <>
      <svg viewBox={`0 -20 ${ props.width } ${ props.height + 50 }`}>
        
        <RosewoodPattern height={ props.height } width={ props.width } />

        {/* Background */ }
        <rect x="0" y="0" width={ props.width } height={ props.height } fill={ roseWoodFill } />

        { createFrets(props.amountOfFrets, props.height, spaceBetweenFrets, firstFretHorizontalPosition) }

        { createStrings(
          props.stringPitches,
          spaceBetweenStrings,
          firstStringVerticalPosition,
          currentFrequency,
          firstFretHorizontalPosition,
          props.amountOfFrets,
          spaceBetweenFrets
          )
        }
      </svg>
    </>
  );
}
  
function createFrets(amount: number, height: number, spaceBetweenFrets: number, xAxis: number) { 
  return Array.from({length: amount}, (_, index) => {
    const x = xAxis;
  
    const fretComp = 
      <Fret
        xPosition={x}
        yPosition={0}
        height={height}
        width={5}
      />
  
    xAxis += spaceBetweenFrets;
  
    return fretComp;
  });
}
  
function createStrings(
  stringPitches: Pitch[],
  spaceBetweenStrings: number,
  yAxis: number,
  currentFrequency: number,
  firstFretHorizontalPosition: number,
  amountOfFrets: number,
  spaceBetweenFrets: number
  ): React.ReactElement[] 
{
  return stringPitches.map((pitch, index) => {
    const y = yAxis;
      
    const stringComp = 
      <StringComponent
        key={ index }
        xPosition={ 0 }
        yPosition={ y }
        pitch={ pitch }
        currentFrequency={ currentFrequency }
        firstFretHorizontalPosition={ firstFretHorizontalPosition }
        amountOfFrets={ amountOfFrets }
        spaceBetweenFrets={ spaceBetweenFrets }
      />;

    yAxis += spaceBetweenStrings;
  
    return stringComp;
  });
}

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

export default Fretboard;
