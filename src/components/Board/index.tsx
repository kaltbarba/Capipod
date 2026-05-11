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
  console.log({ pods, buildings, size });
  return (
    <div className="board-container">
      {Array.from({ length: size }, (_, y) => (
        <div key={y}>
          {Array.from({ length: size }, (_, x) => (
            <div key={x} className="board-cell">
              [{x},{y}]
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
