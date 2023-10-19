import { Note } from "../../src/music/Note";
import { Pitch } from "../../src/music/Pitch";

describe("Tests for Pitch class", () => {

  test("static method generateFollowingPitches returns a sequence of correct pitches", () => {
    // Given
    const startingPitch = new Pitch(Note.E, 82.41);
    const expected = [
      new Pitch(Note.F, 87.31),
      new Pitch(Note.F_Sharp, 92.50),
      new Pitch(Note.G, 98.00),
      new Pitch(Note.G_Sharp, 103.83),
      new Pitch(Note.A, 110.00),
    ];
  
    // When
    const result = Pitch.generateFollowingPitches(startingPitch, 5);
    
    // Then
    expect(result).toEqual(expected);
  });
});
