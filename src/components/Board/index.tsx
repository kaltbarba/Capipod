import { useCallback, useMemo } from "react";
import { getNextCoordinate, getCoordinateKey } from "../../utils";

import {
  Direction,
  ItemCategory,
  PodState,
  type GameItem,
  type Coordinate,
  EffectType,
} from "../../types";

import { useBoardStore, useGameStore, usePlayersStore } from "../../store";

import PlayerIcon from "../../assets/player.svg?react";
import ShelterIcon from "../../assets/shelter.svg?react";
import PotionIcon from "../../assets/potion.svg?react";
import RockIcon from "../../assets/rock.svg?react";
import HoloIcon from "../../assets/holo.svg?react";

import "./index.scss";

export default function Board({
  size,
  className = "",
}: {
  size: number;
  className: string;
}) {
  const { buildingsMap, podsMap, shelterCoordinate, itemsMap } =
    useBoardStore();
  const { podsRevealed, currentPlayerIndex } = useGameStore();
  const { players, playersMap, selectedItem, consumeItem, setSelectedItem } =
    usePlayersStore();

  const isSelectedItemThrowableAt = useMemo(() => {
    const highlightedCoordinates = new Map();

    if (!players.length || selectedItem?.effect.type !== EffectType.activatePod)
      return highlightedCoordinates;

    const { coordinate: currentPlayerCoordinate } = players[currentPlayerIndex];
    for (let i = 1; i <= selectedItem.effect.range; i++) {
      highlightedCoordinates.set(
        getCoordinateKey(
          getNextCoordinate(currentPlayerCoordinate, Direction.up, i),
        ),
        true,
      );
      highlightedCoordinates.set(
        getCoordinateKey(
          getNextCoordinate(currentPlayerCoordinate, Direction.down, i),
        ),
        true,
      );
      highlightedCoordinates.set(
        getCoordinateKey(
          getNextCoordinate(currentPlayerCoordinate, Direction.left, i),
        ),
        true,
      );
      highlightedCoordinates.set(
        getCoordinateKey(
          getNextCoordinate(currentPlayerCoordinate, Direction.right, i),
        ),
        true,
      );
    }

    return highlightedCoordinates;
  }, [players, selectedItem, currentPlayerIndex]);

  const onClickCell = useCallback(
    ({
      item,
      coordinate,
    }: {
      item: GameItem | null;
      coordinate: Coordinate;
    }) => {
      if (!item) return;

      consumeItem({
        item,
        player: players[currentPlayerIndex],
        coordinate,
      });
      setSelectedItem(null);
    },
    [consumeItem, currentPlayerIndex, players, setSelectedItem],
  );

  return (
    <div
      className={`grid board-container ${className}`}
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`,
      }}
    >
      {Array.from({ length: size }, (_, y) =>
        Array.from({ length: size }, (_, x) => {
          // REFACTOR
          const pod = podsMap.get(`${x},${y}`);
          const building = buildingsMap.get(`${x},${y}`);
          const player = playersMap.get(`${x},${y}`);
          const item = itemsMap.get(`${x},${y}`);

          const podClass = pod
            ? pod.state !== PodState.idle || podsRevealed
              ? pod.state
              : ""
            : "";

          return (
            <div
              key={`${x},${y}`}
              className={[
                "overflow-hidden flex justify-center items-center board-cell",
                building ? "building" : "",
                podClass,
                selectedItem?.category === ItemCategory.rock &&
                isSelectedItemThrowableAt.has(getCoordinateKey({ x, y }))
                  ? "selection-highlight cursor-pointer"
                  : "",
              ].join(" ")}
              onClick={() =>
                onClickCell({ item: selectedItem, coordinate: { x, y } })
              }
            >
              {player && <PlayerIcon className="text-red-500 w-full h-full" />}

              {pod?.state === PodState.active && (
                <span>{pod.activeTurnsRemaining}</span>
              )}

              {item ? (
                item.category === ItemCategory.potion ? (
                  <PotionIcon width={24} height={24} />
                ) : item.category === ItemCategory.rock ? (
                  <RockIcon width={24} height={24} />
                ) : item.category === ItemCategory.holo ? (
                  <HoloIcon width={24} height={24} />
                ) : null
              ) : null}

              {x === shelterCoordinate.x && y === shelterCoordinate.y && (
                <ShelterIcon width={40} height={40} />
              )}
            </div>
          );
        }),
      )}
    </div>
  );
}
