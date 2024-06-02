import { useEffect, useRef } from "react";
import { PageLayout } from "components";
import { useTornadoSigJsonByDateRange } from "services/tornado-meso-hail-signatures";

const SignaturesScreen = () => {
  const { data } = useTornadoSigJsonByDateRange("2021121101:2021121102");

  if (data) {
    // console.log(data);
    const point = data[0].SHAPE;
    const [lat, lon] = point.slice(7, -1).split(" ");
    console.log("POINT: ", parseFloat(lat), parseFloat(lon));
  }

  // console.log(
  //   "POINT (-89.4185046707378 40.0321740537808)".slice(7, -1).split(" ")
  // );

  return (
    <PageLayout>
      <h1 className="text-white">
        {data &&
          Object.keys(data[0]).map((key) => (
            <div key={key}>
              <span className="text-red-500">{key}</span> :{" "}
              <span>{data[0][key]}</span>
            </div>
          ))}
      </h1>
    </PageLayout>
  );
};

export default SignaturesScreen;
