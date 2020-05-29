import React from "react";
import { register } from "./register";
import { useRouter } from "next/router";
import { IUserContextState } from "../../_models/_authContext/IAuthContext";
import { IUserContextValues } from "../../_models/_authContext/IAuthContext";
import { handleLoggedIn, addUploadedUserPhotos } from "./userContextMethods";
import { updateUser, logout, login } from "./userContextMethods";

export const AuthContext = React.createContext({} as IUserContextValues);

export const AuthProvider = ({ children }: any) => {
  const [state, setState] = React.useState<IUserContextState>({
    user: null,
    userDetails: null,
    isLoggedIn: false,
  });
  const { pathname, events } = useRouter();

  // On page load, see if you can authenticate user if there is a valid token in localStorage
  React.useEffect(() => {
    handleLoggedIn(state, setState);
  }, []);

  // The useEffect below will redirect unauthorized users back to home page
  React.useEffect(() => {
    // This one fires when you click on forbidden URL - that URL shouldn't be displaying in the first place!
    // Check that a new route is OK
    const handleRouteChange = (url: string) => {
      console.log("handleRouteChange fired");
      if (url !== "/" && !state.isLoggedIn) {
        window.location.href = "/";
      }
    };

    // This one fires when you directly go to a forbidden URL
    // Check that initial route is OK
    if (pathname !== "/" && state.isLoggedIn === null) {
      console.log("pathname !==  fired");
      window.location.href = "/";
    }

    // Monitor routes
    events.on("routeChangeStart", handleRouteChange);
    return () => {
      events.off("routeChangeStart", handleRouteChange);
    };
  }, [state]);

  const value: IUserContextValues = {
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    userDetails: state.userDetails,
    register,
    login: login.bind(null, state, setState),
    logout: logout.bind(null, state, setState),
    updateUser: updateUser.bind(null, state, setState),
    handleLoggedIn: handleLoggedIn.bind(null, state, setState),
    addUploadedUserPhotos: addUploadedUserPhotos.bind(null, state, setState),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
