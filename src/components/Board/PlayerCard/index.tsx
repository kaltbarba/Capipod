import { useMemo, useState } from "react";

import type { Player, GameItem } from "../../../types";
import { ItemCategory, Direction } from "../../../types";

import HeartIcon from "../../../assets/heart.svg?react";
import DieIcon from "../../../assets/die.svg?react";
import PotionIcon from "../../../assets/potion.svg?react";
import RockIcon from "../../../assets/rock.svg?react";

import { usePlayersStore, useGameStore } from "../../../store";

export default function PlayerCard({ player }: { player: Player }) {
  const { rollDieForPlayer, consumeItem } = usePlayersStore();
  const { players, selectedItem, setSelectedItem } = usePlayersStore();
  const { currentPlayerIndex } = useGameStore();

  const potionItems = useMemo(
    () =>
      player.inventory.filter((item) => item.category === ItemCategory.potion),
    [player.inventory],
  );

  const rockItems = useMemo(
    () =>
      player.inventory.filter((item) => item.category === ItemCategory.rock),
    [player.inventory],
  );

  function throwRock(direction: Direction) {
    if (!selectedItem) return;
    consumeItem({ item: selectedItem, player, direction });
    setSelectedItem(null);
  }

  return (
    <div>
      <div
        key={player.name}
        className="border border-gray-100 rounded p-4 mb-4"
      >
        <div>
          <span className="mr-2">{player.name}</span>
          {Array.from({ length: player.healthPoints }, (_, i) => (
            <HeartIcon key={i} width="24" height="24" className="inline" />
          ))}
        </div>

        <DieIcon
          className=""
          onClick={() => rollDieForPlayer(players[currentPlayerIndex])}
          width="24"
          height="24"
        />

        <span>Die: {player.die || "Roll it"}</span>
        <p>steps available: {player.stepsRemaining}</p>
        <div>
          <h5>Inventory</h5>
          {!player.inventory.length && <p>No items</p>}

          {potionItems.length > 0 ? (
            <div>
              {potionItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => consumeItem({ item, player })}
                  title="potion"
                >
                  <PotionIcon width="24" height="24" />
                </button>
              ))}
            </div>
          ) : null}

          {rockItems.length > 0 ? (
            <div>
              {rockItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    setSelectedItem(selectedItem?.id === item.id ? null : item)
                  }
                  title="rock"
                >
                  <RockIcon width="24" height="24" />
                </button>
              ))}
            </div>
          ) : null}

          {selectedItem && (
            <div>
              <p>Throw {selectedItem.name}:</p>
              <div>
                <button onClick={() => throwRock(Direction.up)}>↑</button>
                <button onClick={() => throwRock(Direction.down)}>↓</button>
                <button onClick={() => throwRock(Direction.left)}>←</button>
                <button onClick={() => throwRock(Direction.right)}>→</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
