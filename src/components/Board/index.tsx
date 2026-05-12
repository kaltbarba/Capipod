import Player from "../../classes/Player";

import "./index.scss";

import { useBoardStore } from "../../store";

import PlayerIcon from "../../assets/player.svg?react";
import ShelterIcon from "../../assets/shelter.svg?react";

export default function Board({
  players = [],
  size,
}: {
  size: number;
  players: Player[];
}) {
  const { buildingsMap, podsMap, shelterCoordinate } = useBoardStore();

  const playersMap = new Map<string, Player>(
    players.map((player) => [
      `${player.coordinate.x},${player.coordinate.y}`,
      player,
    ]),
  );

  return (
    <div className="board-container">
      {Array.from({ length: size }, (_, y) =>
        Array.from({ length: size }, (_, x) => {
          const pod = podsMap.get(`${x},${y}`);
          const building = buildingsMap.get(`${x},${y}`);
          const player = playersMap.get(`${x},${y}`);

          return (
            <div
              key={`${x},${y}`}
              className={[
                "board-cell",
                building && "building",
                pod?.state,
              ].join(" ")}
            >
              {player && (
                <PlayerIcon width={40} height={40} style={{ color: "red" }} />
              )}

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
