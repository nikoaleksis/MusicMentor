import { Note } from "../constants/Note";

type NoteProp = {
    pitch: Note;
    xPosition: number;
    yPosition: number;
}

function NoteComponent(props: NoteProp) {
    return (
    <>
        <circle
          cx={props.xPosition}
          cy={props.yPosition}
          r="20"
          fill="white"
          stroke="black"
          strokeWidth="3"
        />
        <text
          x={props.xPosition}
          y={props.yPosition}
          dominantBaseline="central"
          textAnchor="middle"
          fill="#333"
          >
            {props.pitch}
        </text>
    </>
    );
}

export default NoteComponent;