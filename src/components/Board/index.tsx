import Player from "../../classes/Player";

import "./index.scss";

import { useBoardStore, useGameStore } from "../../store";

import PlayerIcon from "../../assets/player.svg?react";
import ShelterIcon from "../../assets/shelter.svg?react";
import PotionIcon from "../../assets/potion.svg?react";

export default function Board({ size }: { size: number }) {
  const { buildingsMap, podsMap, shelterCoordinate, playersMap, itemsMap } =
    useBoardStore();
  const { podsRevealed } = useGameStore();

  return (
    <div className="board-container">
      {Array.from({ length: size }, (_, y) =>
        Array.from({ length: size }, (_, x) => {
          const pod = podsMap.get(`${x},${y}`);
          const building = buildingsMap.get(`${x},${y}`);
          const player = playersMap.get(`${x},${y}`);
          const potion = itemsMap.get(`${x},${y}`);

          return (
            <div
              key={`${x},${y}`}
              className={[
                "board-cell",
                building ? "building" : "",
                podsRevealed && pod ? pod?.state : "",
              ].join(" ")}
            >
              {player && (
                <PlayerIcon width={40} height={40} style={{ color: "red" }} />
              )}

              {potion && <PotionIcon width={40} height={40} />}

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
