import { useState } from "react";
import PlayerSetupDialog from "../PlayerSetupDialog";
import type { PlayerConfig } from "../../types";

const MAX_PLAYERS = 4;
const COLORS: `#${string}`[] = [
  "#00BCD4",
  "#8BC34A",
  "#F44336",
  "#FF9800",
  "#9C27B0",
  "#2196F3",
  "#E91E63",
  "#FFEB3B",
];

export default function LobbyScreen({
  onStart,
}: {
  onStart: (players: PlayerConfig[]) => void;
}) {
  const [players, setPlayers] = useState<PlayerConfig[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const takenColors = players.map((p) => p.color);
  const availableColors = COLORS.filter((c) => !takenColors.includes(c));

  function handlePlayerAdded(config: PlayerConfig) {
    setPlayers((prev) => [...prev, config]);
    setIsDialogOpen(false);
  }

  function removePlayer(index: number) {
    setPlayers((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center bg-background gap-10">
      <h1 className="text-5xl font-bold text-content">CapiPOD</h1>

      <section className="flex flex-col items-center gap-4 w-72">
        <ul className="w-full flex flex-col gap-2">
          {players.map((player, i) => (
            <li
              key={i}
              className="flex items-center justify-between bg-surface-element border border-border rounded px-4 py-2"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: player.color }}
                />
                <span className="text-content font-medium">{player.name}</span>
              </div>
              <button
                onClick={() => removePlayer(i)}
                className="text-gray-500 hover:text-red-400 transition-colors cursor-pointer text-sm"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        {players.length < MAX_PLAYERS && (
          <button
            onClick={() => setIsDialogOpen(true)}
            className="w-full py-2 border border-dashed border-border text-gray-500 hover:text-content hover:border-content rounded transition-colors cursor-pointer"
          >
            + Add Player
          </button>
        )}
      </section>

      <button
        disabled={players.length < 2}
        onClick={() => onStart(players)}
        className="px-10 py-3 bg-amber-300 text-black font-bold rounded tracking-widest uppercase disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-amber-200 transition-colors"
      >
        Start Game
      </button>

      <PlayerSetupDialog
        key={String(isDialogOpen)}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={`Player ${players.length + 1} Setup`}
        colors={availableColors}
        onSubmit={handlePlayerAdded}
      />
    </main>
  );
}
