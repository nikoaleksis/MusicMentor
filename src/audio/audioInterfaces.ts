export interface FrequencyCalculatorStrategy {
  calculateFrequency(audioContext: AudioContext, analyserNode: AnalyserNode): number;
}

export interface AmplitudeCalculatorStrategy {
  calculateAmplitude(analyserNode: AnalyserNode): number;
}
