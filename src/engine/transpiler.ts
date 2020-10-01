import { get } from "svelte/store"
import { tiles } from "@ide/store"
import { GetLanguageTileDefinition } from "@ide/models/LanguageTileDefinition";
import type { Tile } from "@ide/models/Tile";
import { PIN_INPUT } from "@ide/models/Pin";

const language = "javascript";

export const Compile = (): string => {
  const allTiles = get(tiles);

  if (allTiles.length < 1) {
    return ""
  }

  return TranspileTile(get(Object.values(allTiles)[0] as Tile));
}

const TranspileTile = (tile: Tile): string => {
  let result = "";

  console.log(tile);
  const languageTile = GetLanguageTileDefinition(language, tile.definition.name)!;
  const definition = languageTile.definition

  if (typeof (definition) === "string") {
    result = definition;
  } else if (typeof (definition) === "function") {
    // TODO Context
    result = definition();
  } else {
    throw Error("Unknown language tile definition type: " + typeof (definition))
  }

  // TODO Optimize if possible
  if (tile.metadata.pinConnections) {
    const replacements: { [key: string]: string } = {};
    Object.entries(tile.metadata.pinConnections).forEach(([pin, connection]) => {
      if (tile.definition.pins[pin].position === PIN_INPUT) {
        // TODO Check for existence
        replacements[pin] = TranspileTile(get(connection.sourceTile?.tile));
      }
    });

    let offset = 0;
    for (const match of result.matchAll(/\{\{(\w+?)\}\}/g)) {
      if (match[1] in replacements) {
        result = result.slice(0, match.index! + offset) + replacements[match[1]] + result.slice(match.index! + match[0].length + offset);
        offset += replacements[match[1]].length - match[0].length;
      }
    }
  }

  return result;
}