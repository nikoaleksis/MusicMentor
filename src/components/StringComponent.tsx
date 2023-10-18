import { Note } from "../constants/Note";
import NoteComponent from "./NoteComponent";
import styles from "./StringComponent.module.css";

type StringProp = {
  xPosition: number;
  yPosition: number;
  note: Note;
};

function StringComponent(props: StringProp) {
  return (
    <>
      <NoteComponent
        pitch={ props.note }
        xPosition={props.xPosition + 25}
        yPosition={props.yPosition}
      />
      <rect
        className={ styles.string }
        x={ props.xPosition + 50 }
        y={ props.yPosition }
        width="1000"
        height={ 3 }
        fill="#eee"
        />
    </>
  );
}

export default StringComponent;