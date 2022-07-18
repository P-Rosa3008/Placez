import { createContext } from "react";

export const SelectedContext = createContext({
  selected: false,
  setSelected: () => {},
  unSelect: () => {},
});
