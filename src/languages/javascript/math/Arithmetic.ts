import type { LanguageTileDefinition } from "@ide/models/LanguageTileDefinition";
import { Subtract, Sum } from "@ide/definitions";

export const SumJS: LanguageTileDefinition = {
  tile: Sum,
  definition: "({{a}} + {{b}})"
}

export const SubtractJS: LanguageTileDefinition = {
  tile: Subtract,
  definition: "({{a}} - {{b}})"
}