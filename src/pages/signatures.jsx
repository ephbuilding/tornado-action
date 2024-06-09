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
  const { data: tornadoSigs } =
    useTornadoSignaturesByDateRange("20130531:20130601");
  const { data: hailSigs } = useHailSignaturesByDateRange("20130531:20130601");
  const { data: mesoSigs } = useMesoSignaturesByDateRange(
    "2021121101:2021121102"
  );

  return (
    <PageLayout>
      <div className="grid grid-cols-2">
        <div>
          <h2 className="text-center">Tornado Vortex Signatures</h2>
          <USStateMap>
            <g>
              {tornadoSigs &&
                tornadoSigs.map((signature) => {
                  return (
                    <TVSSignaturePoint
                      key={signature.POINT}
                      signature={signature}
                    />
                  );
                })}
            </g>
          </USStateMap>
        </div>
        <div>
          <h2 className="text-center">Hail Signatures</h2>
          <USStateMap>
            <g>
              {hailSigs &&
                hailSigs.map((signature) => {
                  return (
                    <HailSignaturePoint
                      key={signature.POINT}
                      signature={signature}
                    />
                  );
                })}
            </g>
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
// --- SUB-COMPONENTS
const TVSSignaturePoint = ({ signature }) => {
  const [lat, lon] = parseSignatureLatLon(signature);
  const [x, y] = albersGeoPath.centroid({
    type: "Point",
    coordinates: [lat, lon],
  });
  const mxdv = parseInt(signature.MXDV);
  let mxdvColor;
  let pointRadius;

  if (mxdv <= 50) {
    mxdvColor = "green";
    pointRadius = 2;
  } else if (mxdv <= 100) {
    mxdvColor = "blue";
    pointRadius = 4;
  } else if (mxdv <= 150) {
    mxdvColor = "yellow";
    pointRadius = 6;
  } else if (mxdv <= 200) {
    mxdvColor = "orange";
    pointRadius = 8;
  } else {
    mxdvColor = "red";
    pointRadius = 10;
  }

  return (
    <circle
      cx={x}
      cy={y}
      r={pointRadius}
      fill={mxdvColor}
      fillOpacity={0.5}
      stroke="black"
    />
  );
};
const HailSignaturePoint = ({ signature }) => {
  const [lat, lon] = parseSignatureLatLon(signature);
  const [x, y] = albersGeoPath.centroid({
    type: "Point",
    coordinates: [lat, lon],
  });
  const maxSize = parseInt(signature.MAXSIZE);
  let maxSizeColor;

  if (maxSize <= 1) maxSizeColor = "green";
  else if (maxSize <= 2) maxSizeColor = "blue";
  else if (maxSize <= 3) maxSizeColor = "yellow";
  else if (maxSize <= 4) maxSizeColor = "orange";
  else if (maxSize <= 5) maxSizeColor = "red";
  else maxSizeColor = "pink";

  return <circle cx={x} cy={y} r={4} fill={maxSizeColor} stroke="black" />;
};
