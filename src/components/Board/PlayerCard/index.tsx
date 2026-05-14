import type { Player } from "../../../classes";

import HeartIcon from "../../../assets/heart.svg?react";
import DieIcon from "../../../assets/die.svg?react";
import PotionIcon from "../../../assets/potion.svg?react";

import { usePlayersStore, useBoardStore, useGameStore } from "../../../store";

import { ItemCategory } from "../../../types";

export default function PlayerCard({ player }: { player: Player }) {
  "use no memo";

  const { rollDieForPlayer, consumeItem } = usePlayersStore();
  const { players } = useBoardStore();
  const { currentPlayerIndex } = useGameStore();

  const renderPotions = () => {
    const potions = player.inventory.filter(
      (item) => item.category === ItemCategory.potion,
    );

    return potions.map((potion) => (
      <button key={potion.id} onClick={() => consumeItem({ player, item: potion })}>
        <PotionIcon width="25" height="25" className="inline" />
      </button>
    ));
  };

  return (
    <div>
      <div
        key={player.name}
        className="border border-gray-100 rounded p-4 mb-4"
      >
        <div>
          <span className="mr-2">{player.name}</span>
          {Array.from({ length: player.healthPoints }, (_, i) => (
            <HeartIcon key={i} width="25" height="25" className="inline" />
          ))}
        </div>

        <DieIcon
          className=""
          disabled={player !== players[currentPlayerIndex]}
          onClick={() => rollDieForPlayer(players[currentPlayerIndex])}
          width="25"
          height="25"
        />

        <span>Die: {player.die || "Roll it"}</span>
        <p>steps available: {player.stepsRemaining}</p>
        <div>
          <h5>Inventory</h5>
          {!player.inventory.length && <p>No items</p>}
          <div>{renderPotions()}</div>
        </div>
      </div>
    </div>
  );
}
