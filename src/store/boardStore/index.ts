import { create } from "zustand";
import { PodState } from "../../types";
import type { Pod, Building, GameItem } from "../../types";
import type { Coordinate, CoordinateKey } from "../../types";

interface BoardState {
  size: number;

  pods: Pod[];
  podsMap: Map<CoordinateKey, Pod>;
  setPods: (pods: Pod[]) => void;

  buildings: Building[];
  buildingsMap: Map<CoordinateKey, Building>;
  setBuildings: (buildings: Building[]) => void;

  shelterCoordinate: Coordinate;

  itemsMap: Map<CoordinateKey, GameItem>;
  setItems: (items: GameItem[]) => void;
  removeItem: (key: CoordinateKey) => void;
  activatePod: (key: CoordinateKey) => void;
}

const useBoardStore = create<BoardState>((set) => ({
  size: 30,
  pods: [],
  podsMap: new Map(),
  setPods: (pods) => {
    const podsMap = new Map<CoordinateKey, Pod>(
      pods.map((pod) => [`${pod.coordinate.x},${pod.coordinate.y}`, pod]),
    );
    set({ pods, podsMap });
  },

  buildings: [],
  buildingsMap: new Map(),
  setBuildings: (buildings) => {
    const buildingsMap = new Map<CoordinateKey, Building>();
    buildings.forEach((building) =>
      building.coordinates.forEach((c) =>
        buildingsMap.set(`${c.x},${c.y}`, building),
      ),
    );
    set({ buildings, buildingsMap });
  },

  shelterCoordinate: { x: 15, y: 15 },

  itemsMap: new Map(),
  setItems: (items) => {
    const itemsMap = new Map<CoordinateKey, GameItem>(
      items.map((item) => [`${item.coordinate.x},${item.coordinate.y}`, item]),
    );
    set({ itemsMap });
  },
  removeItem: (coordinateKey) => {
    set((state) => {
      const itemsMap = new Map(state.itemsMap);
      itemsMap.delete(coordinateKey);
      return { itemsMap };
    });
  },
  activatePod: (coordinateKey) => {
    set((state) => {
      const pod = state.podsMap.get(coordinateKey);
      if (!pod) return {};
      const updatedPod = { ...pod, state: PodState.active };
      const podsMap = new Map(state.podsMap);
      podsMap.set(coordinateKey, updatedPod);
      const pods = state.pods.map((p) => (p.id === pod.id ? updatedPod : p));
      return { pods, podsMap };
    });
  },
}));

export default useBoardStore;
