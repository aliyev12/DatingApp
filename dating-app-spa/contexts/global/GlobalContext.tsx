import React from "react";
import {
  IGlobalContextValues,
  IGlobalContextState,
} from "../../_models/_globalContext/IGlobalContext";

export const GlobalContext = React.createContext({} as IGlobalContextValues);

export const GlobalProvider = ({ children }: any) => {
  const [state, setState] = React.useState<IGlobalContextState | null>();
  const value: IGlobalContextValues = {};

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
