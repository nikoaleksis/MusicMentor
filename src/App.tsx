import { useEffect, useState, useRef } from "react";
import Fretboard from "./components/Fretboard";
import { E_STANDARD_GUITAR_TUNING } from "./constants/guitarTunings";
import AudioTestComponent from "./AudioTestComponent";

function App() {

  return (
    <div className="App">
      { 
      <AudioTestComponent />
      
      /*<Fretboard
          stringNotes={ E_STANDARD_GUITAR_TUNING }
          amountOfFrets={12}
          height={ 250 }
          width={ 1000 } />
          */
      }
    </div>
  );
}

export default App;
