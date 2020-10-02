import {PIN_INPUT, PIN_OUTPUT} from "../../models/Pin.js";
export const Sum = {
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
};
export const Subtract = {
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
};
//# sourceMappingURL=Arithmetic.js.map
