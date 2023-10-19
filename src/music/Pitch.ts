import { start } from "repl";
import { Note, noteFromString } from "./Note";

export class Pitch {
  readonly note: Note;
  readonly frequency: number;

  constructor(note: Note, frequency: number) {
      this.note = note;
      this.frequency = frequency;
      Object.freeze(this);
  }

  static generateFollowingPitches(
      startAfterPitch: Pitch,
      amountOfPitches: number
      ) : Pitch[] 
  {
    let noteIndex = Object.keys(Note).indexOf(startAfterPitch.note);
    // Next note in sequence
    let iterationIndex = 1;
    let currentFrequency = startAfterPitch.frequency
    const pitches: Pitch[] = [];
    const noteValues: Note[] = Object.values(Note);
    
    while(iterationIndex <= amountOfPitches) {
      noteIndex = (noteIndex + 1) % (Object.keys(Note).length);
      currentFrequency = parseFloat((startAfterPitch.frequency * Math.pow(2, iterationIndex / 12)).toFixed(2));
      
      pitches.push(new Pitch(noteValues[noteIndex], currentFrequency));    

      iterationIndex++
    }
  
    return pitches;
  }
}