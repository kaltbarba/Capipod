import Player from "../../classes/Player";
import Building from "../../classes/Building";
import Pod from "../../classes/Pod";

import "./index.scss";

import PlayerComponent from "./Player";

export default function Board({
  pods = [],
  buildings = [],
  players = [],
  size,
}: {
  pods: Pod[];
  buildings: Building[];
  size: number;
  players: Player[];
}) {
  const podsMap = new Map<string, Pod>(
    pods.map((pod) => [`${pod.coordinate.x},${pod.coordinate.y}`, pod]),
  );

  const buildingsMap = new Map<string, Building>();
  buildings.forEach((building) =>
    building.coordinates.forEach((c) =>
      buildingsMap.set(`${c.x},${c.y}`, building),
    ),
  );

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
