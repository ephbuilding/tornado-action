import * as d3 from "d3";
import { PageLayout } from "components";
import { useState } from "react";
import { USStateMap } from "components/D3Maps";
import { albersGeoPath } from "utils/geometry";
import {
  useTornadoSignaturesByDateRange,
  useHailSignaturesByDateRange,
  useMesoSignaturesByDateRange,
} from "services/tornado-meso-hail-signatures";

const SignaturesScreen = () => {
  // const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  // const showTooltip = () => setTooltipIsOpen(true);

  // ? --> tvs don't return MXDV > 200 kts
  const { data: tornadoSigs } =
    useTornadoSignaturesByDateRange("20211211:20211212");
  // ? --> hail sigs don't return anything > 4"
  const { data: hailSigs } = useHailSignaturesByDateRange("20211211:20211212");
  // ? --> why no meso signature responses from SWDI?
  // const { data: mesoSigs } = useMesoSignaturesByDateRange(
  //   "2021121101:2021121102"
  // );
  let tvsByMxdv = {};
  let hailByMaxSize = {};

  if (tornadoSigs) {
    tvsByMxdv._0_50 = tornadoSigs.filter(({ MXDV }) => +MXDV <= 50);
    tvsByMxdv._50_100 = tornadoSigs.filter(
      ({ MXDV }) => +MXDV > 50 && +MXDV <= 100
    );
    tvsByMxdv._100_150 = tornadoSigs.filter(
      ({ MXDV }) => +MXDV > 100 && +MXDV <= 150
    );
    tvsByMxdv._150_200 = tornadoSigs.filter(
      ({ MXDV }) => +MXDV > 150 && +MXDV <= 200
    );
    tvsByMxdv._201 = tornadoSigs.filter(({ MXDV }) => +MXDV > 200);
  }
  if (hailSigs) {
    hailByMaxSize._0_1 = hailSigs.filter(({ MAXSIZE }) => +MAXSIZE <= 1);
    hailByMaxSize._1_2 = hailSigs.filter(
      ({ MAXSIZE }) => +MAXSIZE > 1 && +MAXSIZE <= 2
    );
    hailByMaxSize._2_3 = hailSigs.filter(
      ({ MAXSIZE }) => +MAXSIZE > 2 && +MAXSIZE <= 3
    );
    hailByMaxSize._3_4 = hailSigs.filter(
      ({ MAXSIZE }) => +MAXSIZE > 3 && +MAXSIZE <= 4
    );
    hailByMaxSize._4_5 = hailSigs.filter(
      ({ MAXSIZE }) => +MAXSIZE > 4 && +MAXSIZE <= 5
    );
    hailByMaxSize._5 = hailSigs.filter(({ MAXSIZE }) => +MAXSIZE > 5);
  }

  return (
    <PageLayout>
      <div className="grid grid-cols-2">
        <div>
          {/* <Tooltip open={tooltipIsOpen} message="Tooltip works!" />; */}
          <h2 className="text-center">Tornado Vortex Signatures</h2>
          <USStateMap>
            {tornadoSigs && (
              <g>
                {tvsByMxdv._0_50.map((signature) => {
                  return (
                    <SignaturePoint
                      key={signature.POINT}
                      signature={signature}
                      color="green"
                      radius={2}
                    />
                  );
                })}
                {tvsByMxdv._50_100.map((signature) => {
                  return (
                    <SignaturePoint
                      key={signature.POINT}
                      signature={signature}
                      color="blue"
                      radius={4}
                    />
                  );
                })}
                {tvsByMxdv._100_150.map((signature) => {
                  return (
                    <SignaturePoint
                      key={signature.POINT}
                      signature={signature}
                      color="yellow"
                      radius={6}
                    />
                  );
                })}
                {tvsByMxdv._150_200.map((signature) => {
                  return (
                    <SignaturePoint
                      key={signature.POINT}
                      signature={signature}
                      color="orange"
                      radius={8}
                    />
                  );
                })}
                {tvsByMxdv._201.map((signature) => {
                  return (
                    <SignaturePoint
                      key={signature.POINT}
                      signature={signature}
                      color="red"
                      radius={10}
                    />
                  );
                })}
              </g>
            )}
          </USStateMap>
        </div>
        <div>
          <h2 className="text-center">Hail Signatures</h2>
          <USStateMap>
            {hailSigs && (
              <g>
                {hailByMaxSize._0_1.map((signature) => {
                  return (
                    <SignaturePoint
                      key={`${signature.SHAPE}-${signature.ZTIME}`}
                      signature={signature}
                      color="green"
                      radius={3}
                    />
                  );
                })}
                {hailByMaxSize._1_2.map((signature) => {
                  return (
                    <SignaturePoint
                      key={`${signature.SHAPE}-${signature.ZTIME}`}
                      signature={signature}
                      color="blue"
                      radius={4.5}
                    />
                  );
                })}
                {hailByMaxSize._2_3.map((signature) => {
                  return (
                    <SignaturePoint
                      key={`${signature.SHAPE}-${signature.ZTIME}`}
                      signature={signature}
                      color="yellow"
                      radius={6}
                    />
                  );
                })}
                {hailByMaxSize._3_4.map((signature) => {
                  return (
                    <SignaturePoint
                      key={`${signature.SHAPE}-${signature.ZTIME}`}
                      signature={signature}
                      color="orange"
                      radius={7.5}
                    />
                  );
                })}
                {hailByMaxSize._4_5.map((signature) => {
                  return (
                    <SignaturePoint
                      key={`${signature.SHAPE}-${signature.ZTIME}`}
                      signature={signature}
                      color="red"
                      radius={9}
                    />
                  );
                })}
                {hailByMaxSize._5.map((signature) => {
                  return (
                    <SignaturePoint
                      key={`${signature.SHAPE}-${signature.ZTIME}`}
                      signature={signature}
                      color="pink"
                      radius={10}
                    />
                  );
                })}
              </g>
            )}
          </USStateMap>
        </div>
      </div>
    </PageLayout>
  );
};

export default SignaturesScreen;

// --- UTILS
const parseSignatureLatLon = (signature) => {
  const point = signature.SHAPE;
  const [lat, lon] = point.slice(7, -1).split(" ");
  return [parseFloat(lat), parseFloat(lon)];
};
const convertSignaturePointToD3Centroid = (signature) => {
  const [lat, lon] = parseSignatureLatLon(signature);
  return albersGeoPath.centroid({
    type: "Point",
    coordinates: [lat, lon],
  });
};
// --- SUB-COMPONENTS
const SignaturePoint = ({ signature, color, radius }) => {
  const [x, y] = convertSignaturePointToD3Centroid(signature);
  const [coords, setCoords] = useState([x, y]);
  const [isShown, setIsShown] = useState(true);

  const showPointTooltip = () => {};

  return (
    <>
      <circle
        cx={x}
        cy={y}
        r={radius}
        fill={color}
        stroke="black"
        onClick={(e) => setCoords(d3.pointer(e))}
      />
      {isShown && (
        <>
          {/* <rect x={coords[0]} y={coords[1]} fill="red" height={20} width={50} /> */}
          <text
            x={coords[0]}
            y={coords[1] + 10}
            stroke="white"
            fill="red"
            textLength={100}
          >
            tooltip text
          </text>
        </>
      )}
    </>
  );
};
