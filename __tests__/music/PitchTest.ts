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

  test("If other frequency is equal to pitch frequency isFrequencyEqual returns true", () => {
    // Given
    const otherFrequency = 82.41;
    const pitch = new Pitch(Note.E, 82.41);
    
    // When
    const isFrequencyEqual = pitch.isFrequencyEqual(otherFrequency);

    // Then
    expect(isFrequencyEqual).toBeTruthy();
  });

  test("If other frequency is lower to pitch frequency but within tolerance isFrequencyEqual returns true", () => {
    // Given
    const targetFrequency = 82.41;
    const otherFrequency = targetFrequency - Pitch.FREQUENCY_TOLERANCE;
    const pitch = new Pitch(Note.E, targetFrequency);
    
    // When
    const isFrequencyEqual = pitch.isFrequencyEqual(otherFrequency);

    // Then
    expect(isFrequencyEqual).toBeTruthy();
  });

  test("If other frequency is lower than tolerance to pitch frequency isFrequencyEqual returns false", () => {
    // Given
    const targetFrequency = 82.41;
    const otherFrequency = targetFrequency - Pitch.FREQUENCY_TOLERANCE - 1;
    const pitch = new Pitch(Note.E, targetFrequency);
    
    // When
    const isFrequencyEqual = pitch.isFrequencyEqual(otherFrequency);

    // Then
    expect(isFrequencyEqual).toBeFalsy();
  });

  
  test("If other frequency is higher to pitch frequency but within tolerance isFrequencyEqual returns true", () => {
    // Given
    const targetFrequency = 82.41;
    const otherFrequency = targetFrequency + Pitch.FREQUENCY_TOLERANCE;
    const pitch = new Pitch(Note.E, targetFrequency);
    
    // When
    const isFrequencyEqual = pitch.isFrequencyEqual(otherFrequency);

    // Then
    expect(isFrequencyEqual).toBeTruthy();
  });

  test("If other frequency is higher than tolerance to pitch frequency isFrequencyEqual returns false", () => {
    // Given
    const targetFrequency = 82.41;
    const otherFrequency = targetFrequency + Pitch.FREQUENCY_TOLERANCE + 1;
    const pitch = new Pitch(Note.E, targetFrequency);
    
    // When
    const isFrequencyEqual = pitch.isFrequencyEqual(otherFrequency);

    // Then
    expect(isFrequencyEqual).toBeFalsy();
  });
});
