import API, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "../../utils/API";
import {
  IRegistrationStatus,
  IRegisterValues,
  MessageStatus,
} from "../../_models";

export const register = async (values: IRegisterValues) => {
  let registrationStatus: IRegistrationStatus = {
    status: MessageStatus.None,
    multipleMessages: false,
    message: "",
    messages: {},
  };

  const options: AxiosRequestConfig = {
    method: "POST",
    url: `/auth/register`,
    data: values,
  };

  const user: void | AxiosResponse<{ token: string }> = await API(
    options
  ).catch((err: AxiosError) => {
    // console.log("Register error: ", err);
    // console.dir(err);
    // const headerError = err.response?.headers["application-error"];
    // console.log("Header error = ", headerError);

    if (err.response?.data.errors) {
      registrationStatus = {
        ...registrationStatus,
        status: MessageStatus.Error,
        multipleMessages: true,
        messages: err.response?.data.errors,
      };
    } else {
      registrationStatus = {
        ...registrationStatus,
        status: MessageStatus.Error,
        multipleMessages: false,
        message: err.response?.data,
      };
    }
  });

  if (user) {
    registrationStatus = {
      ...registrationStatus,
      status: MessageStatus.Success,
      message: `Welcome to Dating App ${values.username}! You have been successfully registered.`,
    };
  }

  return registrationStatus;
};
