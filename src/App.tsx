import { useEffect } from "react";
import Board from "./components/Board";

import PodsData from "./data/pods";
import BuildingsData from "./data/buildings";
import ItemsData from "./data/items";

import Player from "./classes/Player";
import { Direction } from "./types";

import {
  usePlayersStore,
  useLogStore,
  useBoardStore,
  useGameStore,
} from "./store";

import "./App.css";

function App() {
  const { rollDieForPlayer, movePlayer } = usePlayersStore();
  const { players, setPlayers, setBuildings, setPods, size, setItems } =
    useBoardStore();
  const { logs } = useLogStore();
  const { stage, currentPlayerIndex, revealPods } = useGameStore();

  useEffect(() => {
    setPlayers([
      new Player({
        name: "Kenny",
        healthPoints: 5,
        inventory: [],
        coordinate: { x: 0, y: 0 },
      }),
      new Player({
        name: "Andres",
        healthPoints: 5,
        inventory: [],
        coordinate: { x: 29, y: 29 },
      }),
    ]);

    setBuildings(BuildingsData);
    setPods(PodsData);
    setItems(ItemsData);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e): void => {
      switch (e.key) {
        case "ArrowUp":
          movePlayer(players[currentPlayerIndex], Direction.up);
          break;
        case "ArrowDown":
          movePlayer(players[currentPlayerIndex], Direction.down);
          break;
        case "ArrowLeft":
          movePlayer(players[currentPlayerIndex], Direction.left);
          break;
        case "ArrowRight":
          movePlayer(players[currentPlayerIndex], Direction.right);
          break;
      }

      e.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [players, movePlayer, currentPlayerIndex]);

  console.log(usePlayersStore(), useLogStore(), useBoardStore());

  return (
    <div className="App">
      <Board size={size} />

      <div>
        <div>
          <h5>Game state</h5>
          <div>{stage}</div>
        </div>

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
                disabled={player !== players[currentPlayerIndex]}
                onClick={() => rollDieForPlayer(players[currentPlayerIndex])}
              >
                Roll die
              </button>
              <span>Die: {player.die || "Roll it"}</span>
              <p>steps available: {player.stepsRemaining}</p>
              <div>Items in inventory: {player.inventory.length}</div>
            </div>
          ))}
        </div>

        <div className="log-container">
          <h5>Game Log</h5>
          <div className="log-entries">
            {logs.map((log, index) => (
              <div key={index} className="log-entry">
                <span className="timestamp mr-2">
                  {log.timestamp.toLocaleTimeString()}:
                </span>
                <span className="message">{log.message}</span>
              </div>
            ))}
          </div>
        </div>

        <button className="button" onClick={revealPods}>
          Reveal all pods
        </button>
      </div>
    </div>
  );
}

export default App;
