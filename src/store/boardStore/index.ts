import { create } from "zustand";
import { PodState } from "../../types";
import type { Pod, Building, GameItem } from "../../types";
import type { Coordinate, CoordinateKey } from "../../types";

import { getCoordinateKey } from "../../utils";

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
  tickPods: () => void;
  disableAllPods: () => void;
}

function buildPodsMap(pods: Pod[]): Map<CoordinateKey, Pod> {
  return new Map(pods.map((pod) => [getCoordinateKey(pod.coordinate), pod]));
}

const useBoardStore = create<BoardState>((set) => ({
  size: 30,
  pods: [],
  podsMap: new Map(),
  setPods: (pods) => set({ pods, podsMap: buildPodsMap(pods) }),

  buildings: [],
  buildingsMap: new Map(),
  setBuildings: (buildings) => {
    const buildingsMap = new Map<CoordinateKey, Building>();
    buildings.forEach((building) =>
      building.coordinates.forEach((c) =>
        buildingsMap.set(getCoordinateKey(c), building),
      ),
    );
    set({ buildings, buildingsMap });
  },

  shelterCoordinate: { x: 8, y: 0 },

  itemsMap: new Map(),
  setItems: (items) => {
    const itemsMap = new Map<CoordinateKey, GameItem>(
      items.map((item) => [getCoordinateKey(item.coordinate), item]),
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
      const updatedPod = {
        ...pod,
        state: PodState.active,
        activeTurnsRemaining: pod.duration,
      };
      const pods = state.pods.map((p) => (p.id === pod.id ? updatedPod : p));
      return { pods, podsMap: buildPodsMap(pods) };
    });
  },
  disableAllPods: () => {
    set((state) => {
      const pods = state.pods.map((pod) => ({
        ...pod,
        state: PodState.disabled,
        activeTurnsRemaining: 0,
        duration: 0,
      }));

      return { pods, podsMap: buildPodsMap(pods) };
    });
  },
  tickPods: () => {
    set((state) => {
      const pods = state.pods.map((pod) => {
        if (pod.state !== PodState.active) return pod;
        const activeTurnsRemaining = pod.activeTurnsRemaining - 1;
        return {
          ...pod,
          activeTurnsRemaining,
          state:
            activeTurnsRemaining <= 0 ? PodState.disabled : PodState.active,
        };
      });
      return { pods, podsMap: buildPodsMap(pods) };
    });
  },
}));

export default useBoardStore;
