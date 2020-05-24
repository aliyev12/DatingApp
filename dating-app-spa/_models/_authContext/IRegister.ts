import { MessageStatus } from "../Enums";

export interface IRegistrationStatus {
  status: MessageStatus;
  multipleMessages: boolean;
  message: string;
  messages: { [key: string]: string[] };
}

export interface IRegisterValues {
  username: string;
  password: string;
}
