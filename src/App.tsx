import { useEffect } from "react";
import Board from "./components/Board";
import Header from "./components/Header";
import LogSection from "./components/LogSection";
import TurnSection from "./components/TurnSection";
import LobbyScreen from "./components/LobbyScreen";
import type { PlayerConfig } from "./types";

import PodsData from "./data/pods";
import BuildingsData from "./data/buildings";
import ItemsData from "./data/items";

import { Direction } from "./types";

import { usePlayersStore, useBoardStore, useGameStore } from "./store";

import "./App.scss";

function App() {
  const { setBuildings, setPods, size, setItems } = useBoardStore();
  const { setPlayers } = usePlayersStore();
  const { winner, gameStarted, startGame } = useGameStore();

  useEffect(() => {
    setBuildings(BuildingsData);
    setPods(PodsData);
    setItems(ItemsData);
  }, [setBuildings, setPods, setItems]);

  function onGameStart(configs: PlayerConfig[]) {
    const totalPlayers = configs.length;
    setPlayers(
      configs.map((config, i) => ({
        id: `player-${i + 1}`,
        name: config.name,
        color: config.color,
        healthPoints: 10,
        inventory: [],
        die: 0,
        stepsRemaining: 0,
        coordinate: {
          x:
            totalPlayers === 1
              ? 0
              : Math.round((i * (size - 1)) / (totalPlayers - 1)),
          y: 0,
        },
      })),
    );
    startGame();
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      const { players } = usePlayersStore.getState();
      const { currentPlayerIndex } = useGameStore.getState();
      const { movePlayer } = usePlayersStore.getState();
      const currentPlayer = players[currentPlayerIndex];

      switch (e.key) {
        case "ArrowUp":
          movePlayer(currentPlayer, Direction.up);
          e.preventDefault();
          break;
        case "ArrowDown":
          movePlayer(currentPlayer, Direction.down);
          e.preventDefault();
          break;
        case "ArrowLeft":
          movePlayer(currentPlayer, Direction.left);
          e.preventDefault();
          break;
        case "ArrowRight":
          movePlayer(currentPlayer, Direction.right);
          e.preventDefault();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!gameStarted) {
    return <LobbyScreen onStart={onGameStart} />;
  }

  return (
    <div className="h-screen w-screen grid grid-rows-[auto_1fr] grid-cols-[1fr] bg-background">
      <Header />

      <div className="h-full grid grid-cols-[3fr_1fr] overflow-hidden">
        <div className="h-full overflow-hidden relative">
          <Board
            size={size}
            className={[
              "h-full overflow-hidden",
              winner ? "opacity-30" : "",
            ].join(" ")}
          />
          {winner ? (
            <div className="whitespace-nowrap text-3xl text-amber-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface-element p-20 border-border rounded ring-2 ring-gray-500">
              {winner.name} reached the shelter and won the game
            </div>
          ) : null}
        </div>

        <div className="h-full flex flex-col overflow-hidden">
          <TurnSection />
          <LogSection />
        </div>
      </div>
    </div>
  );
}

export default App;
