import type { Readable } from "svelte/store";
import type { PinDefinition } from "./Pin";
import type { Tile } from "./Tile";

export interface Connection {
  metadata: ConnectionMetadata;

  sourceTile?: ConnectionTile;
  targetTile?: ConnectionTile;
}

export interface ConnectionMetadata {
  id: string;
}

export interface ConnectionTile {
  tile: Readable<Tile>;
  pin: PinDefinition;
}