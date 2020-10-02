import {writable} from "../web_modules/svelte/store.js";
export const tiles = (() => {
  const {subscribe, set, update} = writable({});
  return {
    subscribe,
    set,
    update,
    add: (tile) => {
      update((t) => {
        t[tile.metadata.id] = writable(tile);
        return t;
      });
    }
  };
})();
export const connections = (() => {
  const {subscribe, set, update} = writable({});
  return {
    subscribe,
    set,
    update,
    add: (connection) => {
      update((t) => {
        t[connection.metadata.id] = writable(connection);
        return t;
      });
    }
  };
})();
export const drawnConnection = writable(void 0);
