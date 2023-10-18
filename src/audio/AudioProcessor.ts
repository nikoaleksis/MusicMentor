import { AmplitudeCalculatorStrategy, FrequencyCalculatorStrategy } from "./audioInterfaces";
import { MissingAudioContextError, MissingAnalyserNodeError } from "./exceptions";

interface AudioProcessingContext {
  audioContext: AudioContext;
  mediaStreamSource: MediaStreamAudioSourceNode;
  analyserNode: AnalyserNode;
}
export class AudioProcessor {
  private frequencyStrategy: FrequencyCalculatorStrategy;
  private amplitudeStrategy: AmplitudeCalculatorStrategy;

  constructor(frequencyStrategy: FrequencyCalculatorStrategy, amplitudeStrategy: AmplitudeCalculatorStrategy) {
    this.frequencyStrategy = frequencyStrategy;
    this.amplitudeStrategy = amplitudeStrategy;
  }

  calculateFrequency(audioContext: AudioContext, analyserNode: AnalyserNode): number | undefined {
    if (!audioContext) {
      throw new MissingAudioContextError("The provided AudioContext is missing or invalid.");
    } 

    if (!analyserNode) {
      throw new MissingAnalyserNodeError("The provided AnalyserNode is missing or invalid.");
    }

    const amplitude = this.calculateAmplitude(analyserNode);
    if (amplitude < 1) return undefined;
    
    return this.frequencyStrategy.calculateFrequency(audioContext, analyserNode);
  }

  calculateAmplitude(analyserNode: AnalyserNode): number {
    if (!analyserNode) {
      throw new MissingAnalyserNodeError("The provided AnalyserNode is missing or invalid.");
    }
    return this.amplitudeStrategy.calculateAmplitude(analyserNode);
  }
}