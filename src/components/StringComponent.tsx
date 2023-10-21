import { Pitch } from "../music/Pitch";
import PitchComponent from "./PitchComponent";
import styles from "./StringComponent.module.css";

type StringProp = {
  xPosition: number;
  yPosition: number;
  pitch: Pitch;
  currentFrequency: number,
  amountOfFrets: number
  firstFretHorizontalPosition: number,
  spaceBetweenFrets: number
};

function StringComponent(props: StringProp) {
  return (
    <>
      <PitchComponent
        pitch={ props.pitch }
        xPosition={ props.xPosition + 25 }
        yPosition={ props.yPosition }
        currentFrequency={ props.currentFrequency }
      />
      <rect
        className={ styles.string }
        x={ props.xPosition + 50 }
        y={ props.yPosition }
        width="1000"
        height={ 3 }
        fill="#eee"
        />

      { createNotes(
          props.pitch,
          props.amountOfFrets,
          props.yPosition,
          props.firstFretHorizontalPosition,
          props.spaceBetweenFrets,
          props.currentFrequency
          ) 
        }
    </>
  );
}


function createNotes(
  stringPitch: Pitch,
  amountOfFrets: number,
  yPosition: number,
  firstFretPos: number,
  spaceBetweenFrets: number,
  currentFrequency: number,
  ): React.ReactElement[] 
{
  // Collect all the pitches for this string
  const collectedPitches: Pitch[] = Pitch.generateFollowingPitches(stringPitch, amountOfFrets);
      
  // Position the pitch between the frets
  let xPosition = firstFretPos + (spaceBetweenFrets / 2);

  // Go through all the collected notes and place them on the fretboard
  const pitchesForSpecificString = collectedPitches.map((pitch: Pitch) => {
    const pitchComponent = <PitchComponent
      pitch={ pitch }
      xPosition={ xPosition }
      yPosition={ yPosition }
      currentFrequency={ currentFrequency }
    />
          
    xPosition+= spaceBetweenFrets;
            
    return pitchComponent;
  });

  return pitchesForSpecificString;
}

export default StringComponent;