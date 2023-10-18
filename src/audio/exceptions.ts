export class MissingAudioContextError extends Error {
  constructor(message?: string) {
      super(message); 
      this.name = "MissingAudioContextError"; 
      Object.setPrototypeOf(this, MissingAudioContextError.prototype); // This is needed for proper instance checking, especially if targeting ES5
  }
}

export class MissingAnalyserNodeError extends Error {
  constructor(message?: string) {
      super(message); 
      this.name = "MissingAnalyserNodeError"; 
      Object.setPrototypeOf(this, MissingAnalyserNodeError.prototype);
  }
}

export class PitchDetectionError extends Error {
    constructor(message?: string) {
      super(message); 
      this.name = "MissingAnalyserNodeError"; 
      Object.setPrototypeOf(this, PitchDetectionError.prototype);
  }
}