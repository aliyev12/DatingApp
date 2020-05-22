import React from "react";
import jwtDecode from "jwt-decode";
import { login, ILoginValues, ILoginStatus } from "./login";

export interface IToken {
  exp: number;
  iat: number;
  nameid: string;
  nbf: number;
  unique_name: string;
}

export interface IUserContextValues {
  isLoggedIn: boolean;
  handleLoggedIn: (token?: string | undefined) => void;
  user: IToken | null;
  login: (values: ILoginValues) => Promise<ILoginStatus>;
}

interface IState {
  isLoggedIn: boolean;
  user: IToken | null;
}

export const UserContext = React.createContext({} as IUserContextValues);

export const UserProvider = ({ children }: any) => {
  const [state, setState] = React.useState<IState>({
    user: null,
    isLoggedIn: false,
  });

  React.useEffect(() => {
    handleLoggedIn();
  }, []);

  const handleLoggedIn = (tokenFromEndpoint?: string) => {
    try {
      const token = tokenFromEndpoint
        ? tokenFromEndpoint
        : localStorage.getItem("token");
      if (token) {
        const decodedToken: IToken = jwtDecode(token);
        const expirationTime = decodedToken ? decodedToken.exp * 1000 : 0;
        const currentTime = Date.now();
        const expired = expirationTime < currentTime;
        if (!expired) {
          console.log("decodedToken = ", decodedToken);
          setState({
            ...state,
            isLoggedIn: true,
            user: decodedToken,
          });
        } else {
          setState({
            ...state,
            isLoggedIn: false,
            user: null,
          });
        }
      }
    } catch (err) {
      setState({
        ...state,
        isLoggedIn: false,
        user: null,
      });
    }
  };

  const logout = (): void => {
    window.localStorage.removeItem("token");
    setState({
      ...state,
      user: null,
      isLoggedIn: false,
    });
  };

  const value = {
    isLoggedIn: state.isLoggedIn,
    handleLoggedIn: handleLoggedIn,
    user: state.user,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
