import { useEffect } from "react";
import Board from "./components/Board";
import PlayerCard from "./components/Board/PlayerCard";

import PodsData from "./data/pods";
import BuildingsData from "./data/buildings";
import ItemsData from "./data/items";

import { Direction } from "./types";

import {
  usePlayersStore,
  useLogStore,
  useBoardStore,
  useGameStore,
} from "./store";

import "./App.scss";

function App() {
  const { setBuildings, setPods, size, setItems } = useBoardStore();
  const { players, setPlayers } = usePlayersStore();
  const { logs } = useLogStore();
  const { stage, revealPods, finishTurn } = useGameStore();

  useEffect(() => {
    setPlayers([
      {
        id: "player-1",
        name: "Kenny",
        healthPoints: 5,
        inventory: [],
        coordinate: { x: 0, y: 0 },
        die: 0,
        stepsRemaining: 0,
      },
      {
        id: "player-2",
        name: "Andres",
        healthPoints: 5,
        inventory: [],
        coordinate: { x: 0, y: 0 },
        die: 0,
        stepsRemaining: 0,
      },
    ]);

    setBuildings(BuildingsData);
    setPods(PodsData);
    setItems(ItemsData);
  }, [setPlayers, setBuildings, setPods, setItems]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      const { players } = usePlayersStore.getState();
      const { currentPlayerIndex } = useGameStore.getState();
      const { movePlayer } = usePlayersStore.getState();
      const currentPlayer = players[currentPlayerIndex];

      switch (e.key) {
        case "ArrowUp":
          movePlayer(currentPlayer, Direction.up);
          break;
        case "ArrowDown":
          movePlayer(currentPlayer, Direction.down);
          break;
        case "ArrowLeft":
          movePlayer(currentPlayer, Direction.left);
          break;
        case "ArrowRight":
          movePlayer(currentPlayer, Direction.right);
          break;
      }

      e.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="h-screen w-screen grid grid-cols-[3fr_1fr] overflow-hidden">
      <Board size={size} className={"overflow-auto"} />

      <div className="h-full flex flex-col">
        <div>
          <h5>Game state</h5>
          <div>{stage}</div>
        </div>

        <div className="bg-red-300 ">
          {players.map((player) => (
            <PlayerCard key={player.name} player={player} />
          ))}
        </div>

        <div className="max-h-48 overflow-y-auto">
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

        <button className="button" onClick={() => finishTurn(players.length)}>
          Finish turn
        </button>

        <button className="button" onClick={revealPods}>
          Reveal all pods
        </button>
      </div>
    </div>
  );
}

export default App;
