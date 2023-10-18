import { Note } from "../constants/Note";

type FretProps = {
  xPosition: number;
  yPosition: number;
  height: number;
  width: number;
}

function Fret(props: FretProps) {
  return (
    <>
      <rect
        x={props.xPosition}
        y={props.yPosition}
        height={props.height}
        width={props.width}
        fill="#eee"
      />
    </>
  );
}

export default Fret;