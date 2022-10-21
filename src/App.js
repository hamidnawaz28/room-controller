import "./App.css";
import { roomControllerListener } from "../src/firebase/realtime";
import { useEffect, useState } from "react";

function App() {
  const [data, getData] = useState({});
  const extratData = (retrivedData) => {
    getData(retrivedData);
  };
  const getApp = async () => {
    await roomControllerListener(extratData);
  };

  useEffect(() => {
    getApp();
  });

  return (
    <div className="home">
      <div>
        <div>Gate Status</div>
        <div>{data?.["Gate Status"]}</div>
      </div>
      <div>
        <div>Humidity</div>
        <div>{data?.["HUMIDITY"]}</div>
      </div>
      <div>
        <div>Temperature</div>
        <div>{data?.["TEMPERATURE"]}</div>
      </div>
    </div>
  );
}

export default App;
