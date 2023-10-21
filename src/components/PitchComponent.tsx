import { Pitch } from "../music/Pitch";

type PitchProp = {
    pitch: Pitch;
    xPosition: number;
    yPosition: number;
    currentFrequency: number;
}

function PitchComponent(props: PitchProp) {
    return (
    <>
        <circle
          cx={props.xPosition}
          cy={props.yPosition}
          r="20"
          fill={ props.pitch.isFrequencyEqual(props.currentFrequency) ? "green" : "white" }
          stroke="black"
          strokeWidth={1}
        />
        <text
          x={props.xPosition}
          y={props.yPosition}
          dominantBaseline="central"
          textAnchor="middle"
          fill="#333"
          >
            {props.pitch.note}
        </text>
    </>
    );
}

export default PitchComponent;