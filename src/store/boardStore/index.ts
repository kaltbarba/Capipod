import { create } from "zustand";
import type { Player, Pod, Building, GameItem } from "../../classes";
import type { Coordinate, CoordinateKey } from "../../types";

interface BoardState {
  size: number;

  pods: Pod[];
  podsMap: Map<CoordinateKey, Pod>;
  setPods: (pods: Pod[]) => void;

  buildings: Building[];
  buildingsMap: Map<CoordinateKey, Building>;
  setBuildings: (buildings: Building[]) => void;

  players: Player[];
  setPlayers: (players: Player[]) => void;
  playersMap: Map<CoordinateKey, Player>;

  shelterCoordinate: Coordinate;

  itemsMap: Map<CoordinateKey, GameItem>;
  setItems: (items: GameItem[]) => void;
  removeItem: (key: CoordinateKey) => void;
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

  players: [],
  playersMap: new Map(),
  setPlayers: (players) => {
    const playersMap = new Map<CoordinateKey, Player>(
      players.map((player) => [
        `${player.coordinate.x},${player.coordinate.y}`,
        player,
      ]),
    );
    set({ players, playersMap });
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
}));

export default useBoardStore;
