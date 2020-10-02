const ButtonWheelButtons = {};
let buttonsFetched = false;
export const RegisterButton = (contextType, button) => {
  if (buttonsFetched) {
    throw Error("Tried to register a button after a definition was already requested");
  }
  ButtonWheelButtons[contextType] = [...ButtonWheelButtons[contextType], button];
};
export const GetButtons = (contextType) => {
  buttonsFetched = true;
  if (contextType in ButtonWheelButtons) {
    return ButtonWheelButtons[contextType];
  }
  return [];
};
RegisterButton("Draggable", {
  text: "A",
  icon: "B",
  action: () => console.log("CLICK")
});
//# sourceMappingURL=ButtonWheel.js.map
