import Fretboard from "./components/Fretboard";
import { E_STANDARD_GUITAR_TUNING } from "./music/guitarTunings";

function App() {

  return (
    <div className="App">
      {       
      <Fretboard
        stringPitches={ E_STANDARD_GUITAR_TUNING }
        amountOfFrets={12}
        height={ 250 }
        width={ 1000 }
      />
          
      }
    </div>
  );
}

export default App;
