import { ILoginValues, ILoginStatus } from "./ILogin";
import { IRegisterValues, IRegistrationStatus } from "./IRegister";
import { IUser } from "..";
import { IPhoto } from "../IPhoto";

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
  updateUser: (user: IUser) => void;
  deletePhoto: (photoId: number) => void;
  addUploadedUserPhotos: (photos: IPhoto[]) => void;
  user: IToken | null;
  userDetails: IUser | null;
  login: (values: ILoginValues) => Promise<ILoginStatus>;
  register: (values: IRegisterValues) => Promise<IRegistrationStatus>;
  logout: () => void;
}

export interface IUserContextState {
  isLoggedIn: boolean;
  user: IToken | null;
  userDetails: IUser | null;
}
