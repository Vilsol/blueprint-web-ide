import { PIN_INPUT, PIN_OUTPUT } from "@ide/models/Pin";
import type { TileDefinition } from "@ide/models/TileDefinition";

export const Sum: TileDefinition = {
  name: "Sum",
  pins: {
    a: {
      name: "a",
      position: PIN_INPUT,
      type: "Float"
    },
    b: {
      name: "b",
      position: PIN_INPUT,
      type: "Float"
    },
    result: {
      name: "result",
      position: PIN_OUTPUT,
      type: "Float"
    }
  }
}

export const Subtract: TileDefinition = {
  name: "Subtract",
  pins: {
    a: {
      name: "a",
      position: PIN_INPUT,
      type: "Float"
    },
    b: {
      name: "b",
      position: PIN_INPUT,
      type: "Float"
    },
    result: {
      name: "result",
      position: PIN_OUTPUT,
      type: "Float"
    }
  }
}
