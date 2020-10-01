import type { PinDefinition } from "./Pin";

export interface TileDefinition {
  name: string;
  pins: { [key: string]: PinDefinition };
}

const TileDefinitions: { [key: string]: TileDefinition } = {};
let definitionFetched = false;

export const RegisterTileDefinition = (definition: TileDefinition) => {
  if (definitionFetched) {
    throw Error("Tried to register a definition after a definition was already requested");
  }

  // TODO Validate
  TileDefinitions[definition.name] = definition;
}

export const GetTileDefinition = (name: string): TileDefinition | undefined => {
  definitionFetched = true;

  if (name in TileDefinitions) {
    return TileDefinitions[name];
  }

  // TODO Log Error

  return undefined;
}