import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";

export interface ILoginValues {
  username: string;
  password: string;
}

export interface ILoginStatus {
  status: string;
  message?: string | null;
  token?: string | null;
}

export async function login(values: ILoginValues): Promise<ILoginStatus> {
  console.log("arguments = ", arguments);
  let loginStatus: ILoginStatus = {
    status: "fail",
    message: "Something went wrong.",
    token: null,
  };
  const baseUrl = "http://localhost:5000/api/auth/";
  console.log("env = ", process.env);

  const options: AxiosRequestConfig = {
    method: "POST",
    url: `${baseUrl}login`,
    //   headers: { "content-type": "application/x-www-form-urlencoded" },
    data: values,
  };

  const user: void | AxiosResponse<{ token: string }> = await axios(
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
