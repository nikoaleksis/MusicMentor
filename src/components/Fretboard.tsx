import Fret from "./Fret";
import StringComponent from "./StringComponent";
import { Note, circularNoteCollector } from "../constants/Note";
import { RosewoodPattern, roseWoodFill } from "./RosewoodPattern";
import NoteComponent from "./NoteComponent";
import { useEffect, useState } from "react";

type FretboardProps = {
  stringNotes: Note[];
  amountOfFrets: number;
  height: number;
  width:number;
};


function Fretboard(props: FretboardProps) {  
  const firstFretHorizontalPosition = 50;
  const firstStringVerticalPosition = 5;

  const availableHorizontalSpace = props.width - firstFretHorizontalPosition;
  const availableVerticalSpace = props.height - (firstStringVerticalPosition * 2);
  
  const spaceBetweenFrets = availableHorizontalSpace / (props.amountOfFrets);
  const nrOfSpacesBetweenStrings = props.stringNotes.length - 1;
  // Todo: Magic number 3 refers to height of string rect element used for correct bottom margin from fretboard to string
  const spaceBetweenStrings = (availableVerticalSpace - 3) / nrOfSpacesBetweenStrings;

  return (
    <>
      <svg viewBox={`0 -20 ${ props.width } ${ props.height + 50 }`}>
        
        <RosewoodPattern height={ props.height } width={ props.width } />

        {/* Background */ }
        <rect x="0" y="0" width={ props.width } height={ props.height } fill={ roseWoodFill } />

        { createFrets(props.amountOfFrets, props.height, spaceBetweenFrets, firstFretHorizontalPosition) }

        { createStrings(props.stringNotes, spaceBetweenStrings, firstStringVerticalPosition) }

        { createNotes(
          props.stringNotes,
          props.amountOfFrets,
          firstStringVerticalPosition,
          spaceBetweenStrings,
          firstFretHorizontalPosition,
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
  
  function createStrings(stringNotes: Note[], spaceBetweenStrings: number, yAxis: number): React.ReactElement[] {
  
    return stringNotes.map((note, index) => {
      const y = yAxis;
      
      const stringComp = 
        <StringComponent
          key={ index }
          xPosition={ 0 }
          yPosition={ y }
          note={ note }
        />;

      yAxis += spaceBetweenStrings;
  
      return stringComp;
    });
  }
  
  function createNotes(stringNotes: Note[], amountOfFrets: number, firstStringPos: number, spaceBetweenStrings: number, firstFretPos: number, spaceBetweenFrets: number): React.ReactElement[] {
    let yPosition = firstStringPos;

    // We go through each string on the fretboard
    const noteComponents = stringNotes.flatMap((note: Note) => {
        
        // Collect all the notes for this string
        const collectedNotes: Note[] = circularNoteCollector(note, 12);
        
        // Position the note between the frets
        let xPosition = firstFretPos + (spaceBetweenFrets / 2);

        // Go through all the collected notes and place them on the fretboard
        const notesForSpecificString = collectedNotes.map((note: Note) => {
          const noteComponent = <NoteComponent
              pitch={ note }
              xPosition={ xPosition }
              yPosition={ yPosition }
          />
          
          xPosition+= spaceBetweenFrets;
            
          return noteComponent;
        });

        yPosition += spaceBetweenStrings;

        return notesForSpecificString;
    });

    return noteComponents;
  }

export default Fretboard;
          /*const audioContext = new AudioContext();
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const sourceNode = audioContext.createMediaStreamSource(stream);
          const analyserNode = audioContext.createAnalyser();
          sourceNode.connect(analyserNode);
          analyserNode.connect(audioContext.destination);
        
          const bufferLength = analyserNode.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
        
          function update() {
            analyserNode.getByteFrequencyData(dataArray);
            setAudioData(Array.from(dataArray));
            requestAnimationFrame(update);
        
            console.log(audioData);
          }
        
          update();*/