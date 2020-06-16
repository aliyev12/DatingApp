import { handleToken } from "./handleToken";
import { IPhoto, ILoginValues, IUser } from "../../_models";
import API, { AxiosRequestConfig } from "../../utils/API";
import { toast } from "react-toastify";
import Router from "next/router";

const updateLS = (user: IUser) =>
  localStorage.setItem("user", JSON.stringify(user));

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
  Router.push("/");
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
  updateLS(newUserDetails);
};

// After a photo(s) has/have been uploaded, this will add that photo to client side React.context to that it appears on the screen
// this is the case because the endpoint does not return the full user, but returns photos only
export const addUploadedUserPhotos = (
  state: any,
  setState: any,
  photos: IPhoto[]
) => {
  const { userDetails } = state;

  const newUserDetails = { ...userDetails };
  if (!userDetails.photos.length || !userDetails.photoUrl)
    newUserDetails.photoUrl = photos[0].url;

  newUserDetails.photos = [...newUserDetails.photos, ...photos];

  setState({
    ...state,
    userDetails: newUserDetails,
  });
  updateLS(newUserDetails);
};

export async function login(
  state: any,
  setState: any,
  values: ILoginValues,
  redirect: string | undefined = undefined
) {
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
          updateLS(res.data.user);
          setState({
            ...state,
            isLoggedIn: tokenDetails.tokenIsValid,
            user: tokenDetails.tokenData,
            userDetails: res.data.user,
          });
          toast.success("You have successfully logged in.");
          if (redirect) Router.push(redirect);
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

export const deletePhoto = (state: any, setState: any, photoId: number) => {
  const { userDetails } = state;
  const newUserDetails = { ...state.userDetails };

  // Find the photo to check if it is the current photo url
  const foundPhoto = newUserDetails.photos.find(
    (p: IPhoto) => p.id === photoId
  );
  if (foundPhoto) {
    // And if it is the current photoUrl, then go ahead and remove that from user context
    if (userDetails.photoUrl === foundPhoto.url)
      newUserDetails.photoUrl = "/default-user.webp";
  }

  newUserDetails.photos = newUserDetails.photos.filter(
    (p: IPhoto) => p.id !== photoId
  );

  setState({
    ...state,
    userDetails: newUserDetails,
  });
  updateLS(newUserDetails);
};

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
