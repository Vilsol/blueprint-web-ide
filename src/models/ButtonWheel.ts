import type { Readable } from "svelte/store";

export interface ButtonWheelPoint<T> {
  pageX: number;
  pageY: number;
  offsetX: number;
  offsetY: number;
  context: undefined | Readable<T>
}

export interface ButtonWheelButton<T> {
  text: string;
  icon: string;
  action: (context: T) => void;
}

const ButtonWheelButtons: { [key: string]: ButtonWheelButton<any>[] } = {};
let buttonsFetched = false;

export const RegisterButton = (contextType: string, button: ButtonWheelButton<any>) => {
  if (buttonsFetched) {
    throw Error("Tried to register a button after a definition was already requested");
  }

  // TODO Validate
  ButtonWheelButtons[contextType] = [...ButtonWheelButtons[contextType], button];
}

export const GetButtons = (contextType: string): ButtonWheelButton<any>[] => {
  buttonsFetched = true;

  if (contextType in ButtonWheelButtons) {
    return ButtonWheelButtons[contextType];
  }

  return [];
}

RegisterButton("Draggable", {
  text: "A",
  icon: "B",
  action: () => console.log("CLICK")
});