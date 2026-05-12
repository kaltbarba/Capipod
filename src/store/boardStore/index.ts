import { create } from "zustand";
import type { Player, Pod, Building } from "../../classes";

interface BoardState {
  size: number;

  pods: Pod[];
  podsMap: Map<string, Pod>;
  setPods: (pods: Pod[]) => void;

  buildings: Building[];
  buildingsMap: Map<string, Building>;
  setBuildings: (buildings: Building[]) => void;

  players: Player[];
  setPlayers: (players: Player[]) => void;
}

const useBoardStore = create<BoardState>((set) => ({
  size: 30,
  pods: [],
  podsMap: new Map(),
  setPods: (pods) => {
    const podsMap = new Map(
      pods.map((pod) => [`${pod.coordinate.x},${pod.coordinate.y}`, pod]),
    );
    set({ pods, podsMap });
  },

  players: [],
  setPlayers: (players) => set({ players }),

  buildings: [],
  buildingsMap: new Map<string, Building>(),
  setBuildings: (buildings) => {
    const buildingsMap = new Map<string, Building>();
    buildings.forEach((building) =>
      building.coordinates.forEach((c) =>
        buildingsMap.set(`${c.x},${c.y}`, building),
      ),
    );
    set({ buildings, buildingsMap });
  },
}));

export default useBoardStore;
