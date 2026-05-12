import { useEffect } from "react";
import Board from "./components/Board";

import PodsData from "./data/pods";
import BuildingsData from "./data/buildings";

import Player from "./classes/Player";

import { usePlayersStore } from "./store";

import "./App.css";

function App() {
  const { players, setPlayers, rollDieForPlayer, movePlayer } =
    usePlayersStore();

  useEffect(() => {
    setPlayers([
      new Player({
        name: "Kenny",
        healthPoints: 5,
        items: [],
        coordinate: { x: 0, y: 0 },
      }),
      // new Player({
      //   name: "Andres",
      //   healthPoints: 5,
      //   items: [],
      //   coordinate: { x: 29, y: 29 },
      // }),
    ]);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (players[0].stepsRemaining <= 0) return;

      switch (e.key) {
        case "ArrowUp":
          movePlayer(players[0], "up");
          break;
        case "ArrowDown":
          movePlayer(players[0], "down");
          break;
        case "ArrowLeft":
          movePlayer(players[0], "left");
          break;
        case "ArrowRight":
          movePlayer(players[0], "right");
          break;
      }

      e.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [players, movePlayer]);

  console.log(usePlayersStore.getState());

  return (
    <div className="App">
      <Board
        pods={PodsData}
        buildings={BuildingsData}
        size={30}
        players={players}
      />

      <div className="player-info">
        {players.map((player) => (
          <div
            key={player.name}
            className="border border-gray-100 rounded p-4 mb-4"
          >
            <p>
              {player.name} - HP: {player.healthPoints}
            </p>
            <button className="button" onClick={() => rollDieForPlayer(player)}>
              Roll die
            </button>
            <span>Die: {player.die || "Roll it"}</span>
            <p>steps available: {player.stepsRemaining}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
