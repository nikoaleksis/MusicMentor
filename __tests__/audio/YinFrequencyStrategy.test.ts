import { YinFrequencyStrategy } from "../../src/audio/YinFrequencyStrategy";

const EXPECTED_FREQUENCY = 329.63;

// Mocking AudioContext and AnalyserNode
class MockAnalyserNode {
  frequencyBinCount = 2048;

  // This function is used to mock the waveform that represents the sound at the expected frequency.
  getFloatTimeDomainData(array: Float32Array) {
    const sampleRate = 48000;
    const amplitude = 1; // Peak amplitude
    const phaseOffset = 0; // No phase offset
    const bufferLength = 2048; // For example

    for (let i = 0; i < bufferLength; i++) {
      // t represents the time for the current sample
      const t = i / sampleRate;
      array[i] = amplitude * Math.sin(2 * Math.PI * EXPECTED_FREQUENCY * t + phaseOffset);
    }
  }
}

class MockAudioContext {
  sampleRate = 48000;
  createAnalyser() {
    return new MockAnalyserNode();
  }
}

describe('YinFrequencyStrategy', () => {
  it('should calculate frequency close to 82.41 Hz', () => {
    const audioContext = new MockAudioContext() as unknown as AudioContext;
    const analyserNode = audioContext.createAnalyser() as unknown as AnalyserNode;
  
    const strategy = new YinFrequencyStrategy();

    const result = strategy.calculateFrequency(audioContext, analyserNode);

    // Using Jest's toBeCloseTo matcher to allow for slight deviations
    expect(result).toBeCloseTo(EXPECTED_FREQUENCY, 1); // the 1 here means it allows for a deviation of 1Hz
  });

});