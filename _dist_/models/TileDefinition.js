const TileDefinitions = {};
let definitionFetched = false;
export const RegisterTileDefinition = (definition) => {
  if (definitionFetched) {
    throw Error("Tried to register a definition after a definition was already requested");
  }
  TileDefinitions[definition.name] = definition;
};
export const GetTileDefinition = (name) => {
  definitionFetched = true;
  if (name in TileDefinitions) {
    return TileDefinitions[name];
  }
  return void 0;
};
