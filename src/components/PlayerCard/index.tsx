import { useMemo } from "react";

import type { Player } from "../../types";
import { ItemCategory } from "../../types";

import HeartIcon from "../../assets/heart.svg?react";
import PotionIcon from "../../assets/potion.svg?react";
import RockIcon from "../../assets/rock.svg?react";
import HoloIcon from "../../assets/holo.svg?react";
import PortratIcon from "../../assets/portrait.svg?react";
import ItemButton from "../ItemButton";

import { usePlayersStore, useGameStore } from "../../store";

export default function PlayerCard({ player }: { player: Player }) {
  const { consumeItem, setSelectedItem, players } = usePlayersStore();
  const { currentPlayerIndex, winner } = useGameStore();

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

  const holoItems = useMemo(
    () =>
      player.inventory.filter((item) => item.category === ItemCategory.holo),
    [player.inventory],
  );

  const isPlayerTurn = useMemo(
    () => player.id === players[currentPlayerIndex]?.id,
    [currentPlayerIndex, player.id, players],
  );

  return (
    <div
      key={player.name}
      className={[
        "h-fit flex flex-col bg-surface-element rounded py-2 px-4",
        isPlayerTurn ? "ring-3 ring-gray-500" : "border-border border-2",
      ].join(" ")}
    >
      <div className="flex flex-row items-center mb-2">
        <div
          className="flex items-center justify-center border border-border rounded w-10 h-10 mr-2"
          style={{ backgroundColor: player.color }}
        >
          <PortratIcon width="24" height="24" className="inline" />
        </div>

        <div className="flex flex-col">
          <span className="text-content font-medium">{player.name}</span>
          <div className="flex flex-row">
            {Array.from({ length: player.healthPoints }, (_, i) => (
              <HeartIcon key={i} width="16" height="16" className="inline" />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <ItemButton
          item={potionItems[potionItems.length - 1]}
          quantity={potionItems.length}
          iconComponent={PotionIcon}
          disabled={Boolean(winner || !isPlayerTurn)}
          onClick={() =>
            potionItems.length &&
            consumeItem({ item: potionItems[potionItems.length - 1], player })
          }
        />

        <ItemButton
          item={rockItems[rockItems.length - 1]}
          quantity={rockItems.length}
          iconComponent={RockIcon}
          disabled={Boolean(winner || !isPlayerTurn)}
          onClick={() =>
            rockItems.length && setSelectedItem(rockItems[rockItems.length - 1])
          }
        />

        <ItemButton
          item={holoItems[holoItems.length - 1]}
          quantity={holoItems.length}
          iconComponent={HoloIcon}
          disabled={Boolean(winner || !isPlayerTurn)}
          onClick={() =>
            holoItems.length &&
            consumeItem({ item: holoItems[holoItems.length - 1], player })
          }
        />

        <button className="w-14 h-8 border border-border bg-secondary-800 mr-2 flex justify-center items-center relative cursor-pointer"></button>
      </div>
    </div>
  );
}
