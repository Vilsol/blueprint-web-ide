import type { TileDefinition } from "./TileDefinition";

export interface LanguageTileDefinition {
  tile: TileDefinition;
  definition: string | (() => string);
}

const LanguageTileDefinitions: { [key: string]: { [key: string]: LanguageTileDefinition } } = {};
let definitionFetched = false;

export const RegisterLanguageTileDefinition = (language: string, definition: LanguageTileDefinition) => {
  if (definitionFetched) {
    throw Error("Tried to register a definition after a definition was already requested");
  }

  if (!(language in LanguageTileDefinitions)) {
    LanguageTileDefinitions[language] = {};
  }

  // TODO Validate
  LanguageTileDefinitions[language][definition.tile.name] = definition;
}

export const GetLanguageTileDefinition = (language: string, name: string): LanguageTileDefinition | undefined => {
  definitionFetched = true;

  if (language in LanguageTileDefinitions) {
    if (name in LanguageTileDefinitions[language]) {
      return LanguageTileDefinitions[language][name];
    }
  }

  // TODO Log Error

  return undefined;
}