import { useMemo } from "react";

import type { Player } from "../../types";
import { ItemCategory } from "../../types";

import HeartIcon from "../../assets/heart.svg?react";
import PotionIcon from "../../assets/potion.svg?react";
import RockIcon from "../../assets/rock.svg?react";
import PortratIcon from "../../assets/portrait.svg?react";

import { usePlayersStore } from "../../store";

export default function PlayerCard({ player }: { player: Player }) {
  const { consumeItem } = usePlayersStore();
  const { setSelectedItem } = usePlayersStore();

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

  return (
    <div
      key={player.name}
      className="h-fit flex flex-col border-2 border-border bg-surface-element rounded py-2 px-4"
    >
      <div className="flex flex-row items-center mb-2">
        <div className="flex items-center justify-center border border-border rounded w-10 h-10  mr-2">
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
        <button
          className="w-14 h-8 border border-border bg-secondary-800 mr-2 flex justify-center items-center relative cursor-pointer"
          onClick={() =>
            potionItems.length &&
            consumeItem({ item: potionItems[potionItems.length - 1], player })
          }
        >
          {potionItems.length > 0 ? (
            <>
              <PotionIcon width="24" height="24" />
              <div className="absolute top-0 right-2 rounded-full bg-orange-600 text-sm w-4 h-4 inline-flex justify-center items-center">
                {potionItems.length}
              </div>
            </>
          ) : null}
        </button>

        <button
          className="w-14 h-8 border border-border bg-secondary-800 mr-2 flex justify-center items-center relative cursor-pointer"
          onClick={() =>
            rockItems.length && setSelectedItem(rockItems[rockItems.length - 1])
          }
        >
          {rockItems.length > 0 ? (
            <>
              <RockIcon width="24" height="24" />
              <div className="absolute top-0 right-2 rounded-full bg-orange-600 text-sm w-4 h-4 inline-flex justify-center items-center">
                {rockItems.length}
              </div>
            </>
          ) : null}
        </button>

        <button className="w-14 h-8 border border-border bg-secondary-800 mr-2 flex justify-center items-center relative cursor-pointer"></button>

        <button className="w-14 h-8 border border-border bg-secondary-800 mr-2 flex justify-center items-center relative cursor-pointer"></button>
      </div>
    </div>
  );
}
