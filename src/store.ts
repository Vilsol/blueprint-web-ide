import { Writable, writable } from "svelte/store";
import type { Connection } from "./models/Connection";
import type { Tile } from "./models/Tile";

export type TileMap = { [key: string]: Writable<Tile> };
export type ConnectionMap = { [key: string]: Writable<Connection> };

export const tiles = (() => {
  const { subscribe, set, update } = writable({} as TileMap);

  return {
    subscribe,
    set,
    update,
    add: (tile: Tile) => {
      update((t) => {
        t[tile.metadata.id] = writable(tile);
        return t;
      })
    }
  }
})();

export const connections = (() => {
  const { subscribe, set, update } = writable({} as ConnectionMap);

  return {
    subscribe,
    set,
    update,
    add: (connection: Connection) => {
      update((t) => {
        t[connection.metadata.id] = writable(connection);
        return t;
      })
    }
  }
})();

export const drawnConnection = writable(undefined as Connection | undefined)