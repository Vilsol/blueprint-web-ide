import { PIN_INPUT, PIN_OUTPUT } from "@ide/models/Pin";
import type { TileDefinition } from "@ide/models/TileDefinition";

export const Assign: TileDefinition = {
  name: "Assign",
  pins: {
    name: {
      name: "name",
      position: PIN_INPUT,
      type: "String"
    },
    value: {
      name: "value",
      position: PIN_INPUT,
      type: "TODO"
    }
  }
}

export const Read: TileDefinition = {
  name: "Assign",
  pins: {
    name: {
      name: "name",
      position: PIN_INPUT,
      type: "String"
    },
    value: {
      name: "value",
      position: PIN_OUTPUT,
      type: "TODO"
    }
  }
}