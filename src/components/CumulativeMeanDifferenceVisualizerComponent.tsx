import React from 'react';

// 1. Define a type for the component's props
type CumulativeDifferenceGraphProps = {
    data: Float32Array | null;
};

// 2. Use that type in the component definition
export const CumulativeDifferenceGraph: React.FC<CumulativeDifferenceGraphProps> = ({ data }) => {
    const width = 500;
    const height = 500;
    const padding = 20;
    if (data) {

      // Calculate min and max from data for better scaling
      const minValue = data.length > 0 ? Math.min(...data) : 0;
      const maxValue = data.length > 0 ? Math.max(...data) : 1;
      
    // Adjusted yScale for better representation of data range
    const yScale = (d: number) => padding + (height - 2 * padding) * (1 - (d - minValue) / (maxValue - minValue));

    return (
        <svg width={width} height={height}>
            <path
                d={
                    Array.from(data).map((d, i) => `${i === 0 ? 'M' : 'L'} ${padding + i} ${yScale(d)}`).join(' ')
                  }
                  fill="none"
                  stroke="blue"
                  />
        </svg>
    );
  }
  return <p>Error</p>
};