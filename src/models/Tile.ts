import type { Connection } from "./Connection";
import type { TileDefinition } from "./TileDefinition";

export interface Tile {
  definition: TileDefinition;
  metadata: TileMetadata;
}

export interface TileMetadata {
  id: string;
  position: TilePositon;
  component?: HTMLElement;
  pinComponents?: { [key: string]: HTMLElement };
  pinConnections?: { [key: string]: Connection };
}

export interface TilePositon {
  x: number;
  y: number;
}
