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

import PortraitIcon from "../../assets/portrait.svg?react";
import ShelterIcon from "../../assets/shelter.svg?react";
import DamageIcon from "../../assets/damage.svg?react";
import DurationIcon from "../../assets/duration.svg?react";
import ItemIcon from "../../assets/item.svg?react";

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
              style={{ backgroundColor: player?.color }}
              className={[
                "min-w-0 min-h-0 flex justify-center items-center board-cell relative",
                building ? "building" : "",
                (pod && pod.state !== PodState.idle) || podsRevealed
                  ? "group"
                  : "",
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
              {player && <PortraitIcon className="w-full h-full" />}

              {pod?.state === PodState.active &&
                pod.activeTurnsRemaining > 0 && (
                  <DurationIcon className="w-full h-full" />
                )}

              {item ? <ItemIcon className="w-full h-full" /> : null}

              {x === shelterCoordinate.x && y === shelterCoordinate.y && (
                <ShelterIcon className="w-full h-full" />
              )}

              {/* [BUG]: pulse animation affecting tooltip */}
              {pod ? (
                <div
                  className="animate-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1
                hidden group-hover:block bg-surface-element border border-border rounded z-10 whitespace-nowrap"
                >
                  <div className="flex items-center gap-1 p-2 text-sm text-content">
                    <DamageIcon className="w-6 h-6" />
                    <span>{pod.damage}</span>
                    <DurationIcon className="w-6 h-6 ml-2" />
                    <span>
                      {pod.activeTurnsRemaining}/{pod.duration}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
          );
        }),
      )}
    </div>
  );
}
