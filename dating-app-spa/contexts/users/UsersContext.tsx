import React from "react";
import {
  IUsersContextState,
  IUsersContextValues,
} from "../../_models/_usersContext/IUsersContext";
import { getUsers } from "./getUsers";
import { initUsers } from "./usersContextMethods";

export const UsersContext = React.createContext({} as IUsersContextValues);

export const UsersProvider = ({ children }: any) => {
  const [users, setUsers] = React.useState([]);

  const value: IUsersContextValues = {
    initUsers: initUsers.bind(null, setUsers),
    users,
    // handleLoggedIn: handleLoggedIn.bind(null, state, setState),
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
