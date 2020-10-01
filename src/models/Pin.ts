export type PinPosition = string;

export const PIN_INPUT: PinPosition = "PIN_INPUT";
export const PIN_OUTPUT: PinPosition = "PIN_OUTPUT";

export interface PinDefinition {
  name: string;
  position: PinPosition;
  type: string;
}