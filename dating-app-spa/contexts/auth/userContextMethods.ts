import { handleToken } from "./handleToken";
import { getUser } from "..";
import { IPhoto, ILoginValues, IUser } from "../../_models";
import API, { AxiosRequestConfig } from "../../utils/API";
import { toast } from "react-toastify";

// This one will fire when someone still has a valid token in localStorage
// By opening the site, this function will authenticate user if token is still valid
export const handleLoggedIn = async (state: any, setState: any) => {
  let userDetails = null;
  const token = localStorage.getItem("token");
  const tokenDetails = handleToken(token);
  const userFromToken = tokenDetails.tokenData;

  if (userFromToken && userFromToken.nameid) {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      const user = JSON.parse(userFromLocalStorage);
      userDetails = user;
    }
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
  window.localStorage.removeItem("user");
  toast.success("You have been logged out.");
  setState({
    ...state,
    user: null,
    isLoggedIn: false,
    userDetails: null,
  });
}

// Updates the user by completely replacing it with new value
// Make sure that you do all the .Includes and AutoMapper stuff on server side
// otherwise some of the  details will be missing
export const updateUser = (
  state: any,
  setState: any,
  newUserDetails: IUser
) => {
  setState({
    ...state,
    userDetails: newUserDetails,
  });
};

// After a photo(s) has/have been uploaded, this will add that photo to client side React.context to that it appears on the screen
// this is the case because the endpoint does not return the full user, but returns photos only
export const addUploadedUserPhotos = (
  state: any,
  setState: any,
  photos: IPhoto[]
) => {
  const newUserDetails = { ...state.userDetails };
  newUserDetails.photos = [...newUserDetails.photos, ...photos];

  setState({
    ...state,
    userDetails: newUserDetails,
  });
};

export async function login(state: any, setState: any, values: ILoginValues) {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: `/auth/login`,
    data: values,
  };

  await API(options)
    .then((res) => {
      if (res.data.token && res.data.user) {
        localStorage.setItem("token", res.data.token);
        const tokenDetails = handleToken(res.data.token);
        if (tokenDetails.tokenIsValid) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setState({
            ...state,
            isLoggedIn: tokenDetails.tokenIsValid,
            user: tokenDetails.tokenData,
            userDetails: res.data.user,
          });
          toast.success("You have successfully logged in.");
        } else {
          setState({
            ...state,
            isLoggedIn: tokenDetails.tokenIsValid,
            user: null,
            userDetails: null,
          });
          toast.error("Your login attempt failed. Please, try again.");
        }
      }
    })
    .catch((err) => {
      setState({
        ...state,
        isLoggedIn: false,
        user: null,
        userDetails: null,
      });
      toast.error("Your login attempt failed. Please, try again.");
      console.dir(err);
    });
}

// export const updateMainPhoto = (state: any, setState: any, photoId: number) => {
//   const newUserDetails = { ...state.userDetails };
//   newUserDetails.photoUrl = newUserDetails.photos.find(
//     (p: IPhoto) => p.id === photoId
//   ).url;
//   newUserDetails.photos = newUserDetails.photos.map((p: IPhoto) => {
//     if (p.id === photoId) {
//       return {
//         ...p,
//         isMain: true,
//       };
//     }
//     return {
//       ...p,
//       isMain: false,
//     };
//   });

//   setState({
//     ...state,
//     userDetails: newUserDetails,
//   });
// };
