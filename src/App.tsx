import "./App.css";
import Board from "./components/Board";

import PodsData from "./data/pods";
import BuildingsData from "./data/buildings";

function App() {
  return (
    <>
      <Board pods={PodsData} buildings={BuildingsData} size={30} />
    </>
  );
}

export default App;
