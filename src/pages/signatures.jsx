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

  if (tornadoSigs) {
    tornadoSigs.forEach((signature) => {
      // console.log(parsePointLatLong(signature.SHAPE));
      console.log("Signature >> ", parsePointLatLong(signature));
    });
    // console.log(tornadoSigs);
    // const point = tornadoSigs[0].SHAPE;
    // const [lat, lon] = point.slice(7, -1).split(" ");
    // console.log("POINT: ", parseFloat(lat), parseFloat(lon));
  }
  if (hailSigs) {
    // console.log(hailSigs);
    const point = hailSigs[0].SHAPE;
    const [lat, lon] = point.slice(7, -1).split(" ");
    console.log("POINT: ", parseFloat(lat), parseFloat(lon));
  }
  // if (mesoSigs) {
  //   // console.log(mesoSigs);
  //   const point = mesoSigs[0]?.SHAPE;
  //   const [lat, lon] = point?.slice(7, -1).split(" ");
  //   console.log("POINT: ", parseFloat(lat), parseFloat(lon));
  // }

  // console.log(
  //   "POINT (-89.4185046707378 40.0321740537808)".slice(7, -1).split(" ")
  // );

  return (
    <PageLayout>
      <div className="grid grid-cols-3">
        <div className="text-white">
          {tornadoSigs &&
            Object.keys(tornadoSigs[0]).map((key) => (
              <div key={key}>
                <span className="text-red-500">{key}</span> :{" "}
                <span>{tornadoSigs[0][key]}</span>
              </div>
            ))}
        </div>
        <div className="text-white">
          {hailSigs &&
            Object.keys(hailSigs[0]).map((key) => (
              <div key={key}>
                <span className="text-red-500">{key}</span> :{" "}
                <span>{hailSigs[0][key]}</span>
              </div>
            ))}
        </div>
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
      <USStateMap>
        <g>
          {tornadoSigs &&
            tornadoSigs.map((signature) => {
              const { WSR_ID, CELL_ID, ZTIME } = signature;
              return (
                <path
                  key={`${WSR_ID}-${CELL_ID}-${ZTIME}`}
                  d={reverseAlbersGeoPath({
                    type: "Point",
                    coordinates: parsePointLatLong(signature),
                  })}
                  fill="red"
                  stroke="black"
                />
              );
            })}
        </g>
      </USStateMap>
      <USStateMap>
        <g>
          {hailSigs &&
            hailSigs.map((signature) => {
              const { WSR_ID, CELL_ID, ZTIME } = signature;
              return (
                <path
                  key={`${WSR_ID}-${CELL_ID}-${ZTIME}`}
                  d={reverseAlbersGeoPath({
                    type: "Point",
                    coordinates: parsePointLatLong(signature),
                  })}
                  fill="blue"
                  stroke="black"
                />
              );
            })}
        </g>
      </USStateMap>
    </PageLayout>
  );
};

export default SignaturesScreen;

const parsePointLatLong = (signature) => {
  const point = signature.SHAPE;
  const [lat, lon] = point.slice(7, -1).split(" ");
  return [parseFloat(lat), parseFloat(lon)];
};
