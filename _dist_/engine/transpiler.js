import {get} from "../../web_modules/svelte/store.js";
import {tiles} from "../store.js";
import {GetLanguageTileDefinition} from "../models/LanguageTileDefinition.js";
import {PIN_INPUT} from "../models/Pin.js";
const language = "javascript";
export const Compile = () => {
  const allTiles = get(tiles);
  const values = Object.values(allTiles);
  if (values.length < 1) {
    return "";
  }
  return TranspileTile(get(values[0]));
};
const TranspileTile = (tile) => {
  let result = "";
  console.log(tile);
  const languageTile = GetLanguageTileDefinition(language, tile.definition.name);
  const definition = languageTile.definition;
  if (typeof definition === "string") {
    result = definition;
  } else if (typeof definition === "function") {
    result = definition();
  } else {
    throw Error("Unknown language tile definition type: " + typeof definition);
  }
  if (tile.metadata.pinConnections) {
    const replacements = {};
    Object.entries(tile.metadata.pinConnections).forEach(([pin, connection]) => {
      if (tile.definition.pins[pin].position === PIN_INPUT) {
        replacements[pin] = TranspileTile(get(connection.sourceTile?.tile));
      }
    });
    let offset = 0;
    for (const match of result.matchAll(/\{\{(\w+?)\}\}/g)) {
      if (match[1] in replacements) {
        result = result.slice(0, match.index + offset) + replacements[match[1]] + result.slice(match.index + match[0].length + offset);
        offset += replacements[match[1]].length - match[0].length;
      }
    }
  }
  return result;
};
//# sourceMappingURL=transpiler.js.map
