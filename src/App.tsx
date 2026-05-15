import { useEffect } from "react";
import Board from "./components/Board";
import Header from "./components/Header";
import LogSection from "./components/LogSection";
import TurnSection from "./components/TurnSection";

import PodsData from "./data/pods";
import BuildingsData from "./data/buildings";
import ItemsData from "./data/items";

import { Direction } from "./types";

import { usePlayersStore, useBoardStore, useGameStore } from "./store";

import "./App.scss";

function App() {
  const { setBuildings, setPods, size, setItems } = useBoardStore();
  const { setPlayers } = usePlayersStore();

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
          <TurnSection />
          <LogSection />
        </div>
      </div>
    </div>
  );
}

export default App;
