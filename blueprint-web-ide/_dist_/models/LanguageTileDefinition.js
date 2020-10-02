const LanguageTileDefinitions = {};
let definitionFetched = false;
export const RegisterLanguageTileDefinition = (language, definition) => {
  if (definitionFetched) {
    throw Error("Tried to register a definition after a definition was already requested");
  }
  if (!(language in LanguageTileDefinitions)) {
    LanguageTileDefinitions[language] = {};
  }
  LanguageTileDefinitions[language][definition.tile.name] = definition;
};
export const GetLanguageTileDefinition = (language, name) => {
  definitionFetched = true;
  if (language in LanguageTileDefinitions) {
    if (name in LanguageTileDefinitions[language]) {
      return LanguageTileDefinitions[language][name];
    }
  }
  return void 0;
};
//# sourceMappingURL=LanguageTileDefinition.js.map
