import { handleToken } from "./handleToken";
import { getUser } from "..";
import { IPhoto } from "../../_models";

export const handleLoggedIn = async (
  state: any,
  setState: any,
  tokenFromEndpoint?: string
): void => {
  let userDetails = null;
  const token = tokenFromEndpoint
    ? tokenFromEndpoint
    : localStorage.getItem("token");
  const tokenDetails = handleToken(token);
  const userFromToken = tokenDetails.tokenData;

  if (userFromToken && userFromToken.nameid) {
    const user = await getUser(userFromToken.nameid);
    if (user) userDetails = user;
  }

  setState({
    ...state,
    isLoggedIn: tokenDetails.tokenIsValid,
    user: userFromToken,
    userDetails,
  });
};

export function logout(state: any, setState: any): void {
  window.localStorage.removeItem("token");
  setState({
    ...state,
    user: null,
    isLoggedIn: false,
  });
}

export const updateMainPhoto = (state: any, setState: any, photoId: number) => {
  const newUserDetails = { ...state.userDetails };
  newUserDetails.photoUrl = newUserDetails.photos.find(
    (p: IPhoto) => p.id === photoId
  ).url;
  newUserDetails.photos = newUserDetails.photos.map((p: IPhoto) => {
    if (p.id === photoId) {
      return {
        ...p,
        isMain: true,
      };
    }
    return {
      ...p,
      isMain: false,
    };
  });

  setState({
    ...state,
    userDetails: newUserDetails,
  });
};

export const addUploadedUserPhotos = (
  state: any,
  setState: any,
  photos: IPhoto[]
) => {
  console.log("received = ", photos);
  const newUserDetails = { ...state.userDetails };
  newUserDetails.photos = [...newUserDetails.photos, ...photos];

  setState({
    ...state,
    userDetails: newUserDetails,
  });
};
