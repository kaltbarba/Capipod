import type { Building, Pod } from "../../classes";

import "./index.scss";

export default function Board({
  pods = [],
  buildings = [],
  size,
}: {
  pods: Pod[];
  buildings: Building[];
  size: number;
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
  console.log({ podsMap, buildingsMap });
  return (
    <div className="board-container">
      {Array.from({ length: size }, (_, y) => (
        <div key={y}>
          {Array.from({ length: size }, (_, x) => {
            const pod = podsMap.get(`${x},${y}`);
            const building = buildingsMap.get(`${x},${y}`);
            const element = pod || building;

            return (
              <div
                key={x}
                className={[
                  "board-cell",
                  building && "building",
                  pod?.state,
                ].join(" ")}
              >
                {element ? "" : `${x},${y}`}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
