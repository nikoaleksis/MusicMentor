import { AmplitudeCalculatorStrategy } from "./audioInterfaces";

export class RMSAmplitudeStrategy implements AmplitudeCalculatorStrategy {

  /**
   * Here we are using RMS to get the average amplitude
   * @param AnalyserNode 
   * @param analyserNode The frequency source
   */
  calculateAmplitude(analyserNode: AnalyserNode): number {
    // Array to hold the time-domain samples
    const samples = new Uint8Array(analyserNode.frequencyBinCount);

    // Fetch the time-domain data from the analyzer node
    analyserNode.getByteTimeDomainData(samples);

    // Calculate the sum of squared deviations from the midpoint (128). 
    // The data range is from 0 to 255, so we re-center it around 0 by subtracting 128 from each sample.
    const sumOfSquares = samples.reduce((accum, currentSample) => {
      const deviation = currentSample - 128;
      return accum + (deviation * deviation);
    }, 0);

    // Compute the average of the squared values
    const average = sumOfSquares / samples.length;

    // We take the square root of the average because our calculations so far have 
    // been based on squared deviations (to ensure all values are positive). By square rooting 
    // the average, we bring the value back to the same scale as the original samples, giving us a 
    // single number that represents the "typical" deviation (or amplitude) of the samples.
    return Math.sqrt(average);
  }
}