import { ILoginValues, ILoginStatus } from "../../_models";
import API, {
  AxiosResponse,
  AxiosRequestConfig,
  AxiosError,
} from "../../utils/API";

export async function login(values: ILoginValues): Promise<ILoginStatus> {
  let loginStatus: ILoginStatus = {
    status: "fail",
    message: "Something went wrong.",
    token: null,
  };

  const options: AxiosRequestConfig = {
    method: "POST",
    url: `/auth/login`,
    data: values,
  };

  const user: void | AxiosResponse<{ token: string }> = await API(
    options
  ).catch((err: AxiosError) => {
    const headerError = err.response?.headers["application-error"];
    const dataError = err.response?.data.title;
    loginStatus = {
      status: "fail",
      message: headerError ? headerError : dataError,
    };
  });

  if (user) {
    localStorage.setItem("token", user.data.token);
    loginStatus = { status: "success", token: user.data.token };
  }
  return loginStatus;
}
