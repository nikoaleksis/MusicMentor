type RosewoodPatternProps = {
  height: number;
  width: number;
};

function RosewoodPattern(props: RosewoodPatternProps) {
  
  const rosewoodPattern = require("../assets/images/rosewood.jpg");

  return (
    <>
      <defs>
        <pattern
          id={id}
          patternUnits="userSpaceOnUse"
          width={props.width}
          height={props.height}
        >
          <image
            href={rosewoodPattern}
            width={props.width}
            height={props.height}
            preserveAspectRatio="none"
          />
        </pattern>
      </defs>    
    </>
  )
}

const id = "rosewood-pattern";
const roseWoodFill = `url(#${id})`;

export { RosewoodPattern, roseWoodFill };