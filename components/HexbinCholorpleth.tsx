import * as d3 from 'd3';
import { FeatureCollection, Geometry } from 'geojson';

// List of additional properties that are specific to my geoJson file
type FeatureProps = {
  google_name: string;
  iso3166_2: string;
};

type MapProps = {
  width: number;
  height: number;
  geoData: FeatureCollection<Geometry, FeatureProps>;
  numData: { code: string; value: number }[];
};

const HexbinCholorpleth = ({ width, height, geoData, numData }: MapProps) => {
  // const colorScale = d3
  //   .scaleLinear<string, string, never>()
  //   .domain([3, 20])
  //   .range(['#fff', '#d13728']);

  const projection = d3.geoMercator().scale(530).translate([1400, 660]);

  const geoPathGenerator = d3.geoPath().projection(projection);

  const allSvgPaths = geoData.features.map((shape) => {
    const regionData = numData.find(
      (region) => region.code === shape.properties.google_name
    );
    // console.log('regionData', regionData)
    // const color = regionData ? colorScale(regionData?.value) : '#000';

    const centroid = geoPathGenerator.centroid(shape);

    return (regionData?.value !== undefined && regionData.value > 0) ? 
       (
        <>
          <path
            key={shape.id}
            d={geoPathGenerator(shape)}
            stroke="#333333"
            strokeWidth={0.5}
            // fill={color}
            fill='#e6cc84'
            fillOpacity={1}
          />
          <text
            x={centroid[0]}
            y={centroid[1]}
            fill="#333333"
            fontSize={11}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {shape.properties.iso3166_2}: {regionData?.value}
          </text>
        </>
      )
      :
      (
        <>
          <path
            key={shape.id}
            d={geoPathGenerator(shape)}
            stroke="#e6cc84"
            strokeWidth={0.5}
            // fill={'none'}
            fill='#e5e5e5'
            fillOpacity={1}
          />
          <text
            x={centroid[0]}
            y={centroid[1]}
            fill="#333333"
            fontSize={11}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {shape.properties.iso3166_2}
          </text>
        </>
      )
  });

  return (
    <div>
      <svg width={width} height={height}>
        {allSvgPaths}
      </svg>
    </div>
  );
};
 export default HexbinCholorpleth;