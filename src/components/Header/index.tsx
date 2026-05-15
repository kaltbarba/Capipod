import PlayerCard from "../PlayerCard";

import { usePlayersStore } from "../../store";

export default function Header() {
  const { players } = usePlayersStore();

  return (
    <header className="h-30 flex flex-row items-center bg-surface border-b-2 border-border">
      <div className="flex items-center mx-8">
        <h1 className="font-bold text-2xl text-content">CapiPOD</h1>
      </div>
      <div
        style={{ gridTemplateColumns: `repeat(${players.length}, auto)` }}
        className="grid gap-x-4 h-full items-center"
      >
        {players.map((player) => (
          <PlayerCard key={player.name} player={player} />
        ))}
      </div>
    </header>
  );
}
