import { IUser } from "../IUser";
import { MessageStatus } from "../Enums";

export interface IUsersContextValues {
  initUsers: () => void;
  users: IUser[];
}

export interface IUsersContextState {}

export interface IEditUserValues {
  introduction: string;
  lookingFor: string;
  interests: string;
  city: string;
  country: string;
}

export interface IEditUserStatus {
  status: MessageStatus;
  multipleMessages: boolean;
  message: string;
  messages: { [key: string]: string[] };
}
