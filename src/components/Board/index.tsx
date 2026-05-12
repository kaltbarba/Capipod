import Player from "../../classes/Player";
import Building from "../../classes/Building";
import Pod from "../../classes/Pod";

import "./index.scss";

import PlayerComponent from "./Player";

import { useBoardStore } from "../../store";

export default function Board({
  players = [],
  size,
}: {
  size: number;
  players: Player[];
}) {
  const { buildingsMap, podsMap } = useBoardStore();

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
              {player ? <PlayerComponent player={player} /> : `${x},${y}`}
            </div>
          );
        }),
      )}
    </div>
  );
}
