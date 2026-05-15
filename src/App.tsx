import { useEffect } from "react";
import Board from "./components/Board";
import Header from "./components/Header";
import LogSection from "./components/LogSection";
import DieIcon from "./assets/die.svg?react";

import PodsData from "./data/pods";
import BuildingsData from "./data/buildings";
import ItemsData from "./data/items";

import { Direction } from "./types";

import { usePlayersStore, useBoardStore, useGameStore } from "./store";

import "./App.scss";

function App() {
  const { setBuildings, setPods, size, setItems } = useBoardStore();
  const { players, setPlayers, rollDieForPlayer } = usePlayersStore();

  const { stage, revealPods, finishTurn, currentPlayerIndex } = useGameStore();

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
        coordinate: { x: 25, y: 0 },
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
    <div className="h-screen w-screen grid grid-cols-[1fr]  bg-background">
      <Header />

      <div className="grid grid-cols-[3fr_1fr] mt-2">
        <Board size={size} className={"overflow-auto"} />

        <div className="h-full flex flex-col">
          <div className="border-2 border-border bg-surface flex flex-col justify-center items-center p-8">
            <h2 className="text-content font-bold mb-8">Game state: {stage}</h2>
            <DieIcon className="w-30 mb-8" />
            <button
              className="text-xl bg-button-primary font-semibold border-border px-8 py-4 rounded cursor-pointer w-full mb-4"
              onClick={() => rollDieForPlayer(players[currentPlayerIndex])}
            >
              Roll die
            </button>

            <button
              className="text-xl bg-button-danger font-semibold border-border px-8 py-4 rounded cursor-pointer w-full"
              onClick={() => finishTurn(players.length)}
            >
              Finish turn
            </button>

            <button
              className="text-xl bg-gray-50 font-semibold border-border px-8 py-4 rounded cursor-pointer w-full"
              onClick={revealPods}
            >
              Reveal all pods
            </button>
          </div>

          <LogSection />
        </div>
      </div>
    </div>
  );
}

export default App;
