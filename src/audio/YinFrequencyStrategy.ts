import { FrequencyCalculatorStrategy } from "./audioInterfaces";
import { PitchDetectionError } from "./exceptions";

export class YinFrequencyStrategy implements FrequencyCalculatorStrategy {
  
  /**
   * Calculate the frequency using the YIN-algorithm
   * @param audioContext
   * @param analyserNode 
   * @returns 
   */  
  calculateFrequency(audioContext: AudioContext, analyserNode: AnalyserNode): number {
    // Amount of frequencies
    const bufferLength = analyserNode.frequencyBinCount;
    console.log("BUFFER LENGTH: " + bufferLength);
    // Represents the sound wave form
    const timeDomainData = new Float32Array(bufferLength);
    // Populate the array
    analyserNode.getFloatTimeDomainData(timeDomainData);

    // The difference function compares the waveform with itself at different time lags (lag).
    const difference = this.getDifference(timeDomainData);

    // Make the differences easier to analyze for pitch detection
    const cumulativeMeanNormalizedDifference = this.getCumulativeMeanNormalizedDifference(difference);

    const lag = this.getlagFromMinimumDifference(cumulativeMeanNormalizedDifference);
    console.log("LAG: " + lag);

    //Ignoring betterLag for now to first get original lag to be more precise
    const betterLag = this.refineLagUsingParabolicInterpolation(lag, cumulativeMeanNormalizedDifference);
    console.log("Better lag: " + betterLag);

    const sampleRate = audioContext.sampleRate;
    console.log("SAMPLE RATE: " + sampleRate);
    
    // The result: the detected pitch in Hertz
    const frequency = sampleRate / betterLag;
    console.log("FREQUENCY: " + frequency + "Hz");

    return frequency;
  }

  private getDifference(timeDomainData: Float32Array): Float32Array {
    // We only need half the buffer because a lag beyond half would compare very distant points,
    // which isn't as useful for pitch detection.
    const difference = new Float32Array(timeDomainData.length);
  
    for(let lag = 0; lag < difference.length; lag++) {
      let sum = 0;
      for(let i = 0; i < difference.length - lag; i++) {
        const delta = timeDomainData[i] - timeDomainData[i + lag];
        sum += delta * delta;
      }
    
      difference[lag] = sum;
    }

    return difference;
  }

  private getCumulativeMeanNormalizedDifference(difference: Float32Array): Float32Array {
    const cumulativeDifference = new Float32Array(difference.length);
    cumulativeDifference[0] = 1;
  
    let cumulativeSum = 0;

    for(let lag = 1; lag < difference.length; lag++) {
      cumulativeSum += difference[lag]; 
      cumulativeDifference[lag] = difference[lag] / (cumulativeSum / lag);
    }
  
    return cumulativeDifference;
  }

  private getlagFromMinimumDifference(cumulativeMeanNormalizedDifference: Float32Array): number {
    const threshold = 0.01;
    let minimumDifference = Infinity;
    let lagWithMinDifference: number | undefined;
    let currentValue: number;

    // Search for the global minimum in the cumulativeMeanNormalizedDifference array
    for(let currentLag = 0; currentLag < cumulativeMeanNormalizedDifference.length; currentLag++) {
      currentValue = cumulativeMeanNormalizedDifference[currentLag];

      // If the currentValue is below the threshold, return the currentLag immediately
      if (currentValue < threshold) {
        return currentLag;
      }

      // Update the lagWithMinDifference if the currentValue is a new minimum
      if (currentValue < minimumDifference) {
        minimumDifference = currentValue;
        lagWithMinDifference = currentLag;
      }
    }

    return lagWithMinDifference ?? 0;
  }

  private refineLagUsingParabolicInterpolation(lag: number, cumulativeMeanNormalizedDifference: Float32Array): number {
    let betterLag = lag;
    if(lag < cumulativeMeanNormalizedDifference.length - 1 && lag > 0) {
        const s0 = cumulativeMeanNormalizedDifference[lag - 1];
        const s1 = cumulativeMeanNormalizedDifference[lag];
        const s2 = cumulativeMeanNormalizedDifference[lag + 1];
        // This calculation provides a more precise estimate of where the smallest 
        // difference occurs between the discrete values.
        betterLag = lag + (s2 - s0) / (2 * (2 * s1 - s2 - s0));
    }

    return betterLag;
  }
}