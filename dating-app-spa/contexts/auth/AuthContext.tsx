import React from "react";
import { login } from "./login";
import { register } from "./register";
import {
  IUserContextState,
  IUserContextValues,
} from "../../_models/_authContext/IAuthContext";
import { handleLoggedIn, logout } from "./userContextMethods";

export const AuthContext = React.createContext({} as IUserContextValues);

export const AuthProvider = ({ children }: any) => {
  const [state, setState] = React.useState<IUserContextState>({
    user: null,
    isLoggedIn: false,
  });

  React.useEffect(() => {
    handleLoggedIn(state, setState);
  }, []);

  const value: IUserContextValues = {
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    login,
    register,
    logout: logout.bind(null, state, setState),
    handleLoggedIn: handleLoggedIn.bind(null, state, setState),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
