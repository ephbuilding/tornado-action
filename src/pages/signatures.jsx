import { PageLayout } from "components";
import { useEffect, useRef } from "react";
import { USStateMap } from "components/D3Maps";
import { albersGeoPath, reverseAlbersGeoPath } from "utils/geometry";
import {
  useTornadoSignaturesByDateRange,
  useHailSignaturesByDateRange,
  useMesoSignaturesByDateRange,
} from "services/tornado-meso-hail-signatures";

const SignaturesScreen = () => {
  const { data: tornadoSigs } = useTornadoSignaturesByDateRange(
    "2021121101:2021121102"
  );
  const { data: hailSigs } = useHailSignaturesByDateRange(
    "2021121101:2021121102"
  );
  const { data: mesoSigs } = useMesoSignaturesByDateRange(
    "2021121101:2021121102"
  );

  return (
    <PageLayout>
      <div className="grid grid-cols-2">
        {/* <div className="text-white">
          {tornadoSigs &&
            Object.keys(tornadoSigs[0]).map((key) => (
              <div key={key}>
                <span className="text-red-500">{key}</span> :{" "}
                <span>{tornadoSigs[0][key]}</span>
              </div>
            ))}
        </div> */}
        {/* <div className="text-white">
          {hailSigs &&
            Object.keys(hailSigs[0]).map((key) => (
              <div key={key}>
                <span className="text-red-500">{key}</span> :{" "}
                <span>{hailSigs[0][key]}</span>
              </div>
            ))}
        </div> */}
        {/* <div className="text-white">
          {mesoSigs &&
            Object.keys(mesoSigs[0]).map((key) => (
              <div key={key}>
                <span className="text-red-500">{key}</span> :{" "}
                <span>{mesoSigs[0][key]}</span>
              </div>
            ))}
        </div> */}
      </div>
      <div className="grid grid-cols-2">
        <USStateMap>
          <g>
            {tornadoSigs &&
              tornadoSigs.map((signature) => {
                return (
                  <SignaturePoint
                    key={signature.POINT}
                    signature={signature}
                    color="red"
                  />
                );
              })}
          </g>
        </USStateMap>
        <USStateMap>
          <g>
            {hailSigs &&
              hailSigs.map((signature) => {
                return (
                  <SignaturePoint
                    key={signature.POINT}
                    signature={signature}
                    color="blue"
                  />
                );
              })}
          </g>
        </USStateMap>
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
// --- SUB-COMPONENTS
const SignaturePoint = ({ signature, color }) => {
  const [lat, lon] = parseSignatureLatLon(signature);
  const [x, y] = albersGeoPath.centroid({
    type: "Point",
    coordinates: [lat, lon],
  });

  return <circle cx={x} cy={y} r={3} fill={color} stroke="black" />;
};
