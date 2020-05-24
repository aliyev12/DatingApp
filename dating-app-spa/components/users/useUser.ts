import React from "react";
import { AuthContext, getUser } from "../../contexts";
import { IUser } from "../../_models";

export const useUser = (id: string) => {
  const [user, setUser] = React.useState<IUser | null>(null);
  const authContext = React.useContext(AuthContext);

  React.useEffect(() => {
    if (authContext.isLoggedIn) initUser();
  }, [authContext]);

  const initUser = async () => {
    const res = await getUser(id);
    setUser(res);
  };

  // if (!user) return null;

  return { user };
};
