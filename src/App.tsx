import { useEffect } from "react";
import Board from "./components/Board";

import PodsData from "./data/pods";
import BuildingsData from "./data/buildings";

import Player from "./classes/Player";
import { Direction } from "./types";

import { usePlayersStore, useLogStore } from "./store";

import "./App.css";

function App() {
  const { players, setPlayers, rollDieForPlayer, movePlayer } =
    usePlayersStore();
  const logStore = useLogStore();

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
    const handleKeyDown = (e): void => {
      if (players[0].stepsRemaining <= 0) return;

      switch (e.key) {
        case "ArrowUp":
          movePlayer(players[0], Direction.up);
          break;
        case "ArrowDown":
          movePlayer(players[0], Direction.down);
          break;
        case "ArrowLeft":
          movePlayer(players[0], Direction.left);
          break;
        case "ArrowRight":
          movePlayer(players[0], Direction.right);
          break;
      }

      e.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [players, movePlayer]);

  console.log(usePlayersStore(), useLogStore());

  return (
    <div className="App">
      <Board
        pods={PodsData}
        buildings={BuildingsData}
        size={30}
        players={players}
      />

      <div>
        <div className="player-info">
          {players.map((player) => (
            <div
              key={player.name}
              className="border border-gray-100 rounded p-4 mb-4"
            >
              <p>
                {player.name} - HP: {player.healthPoints}
              </p>
              <button
                className="button"
                onClick={() => rollDieForPlayer(player)}
              >
                Roll die
              </button>
              <span>Die: {player.die || "Roll it"}</span>
              <p>steps available: {player.stepsRemaining}</p>
            </div>
          ))}
        </div>

        <div className="log-container">
          <h5>Game Log</h5>
          <div className="log-entries">
            {logStore.logs.map((log, index) => (
              <div key={index} className="log-entry">
                <span className="timestamp mr-2">
                  {log.timestamp.toLocaleTimeString()}:
                </span>
                <span className="message">{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
