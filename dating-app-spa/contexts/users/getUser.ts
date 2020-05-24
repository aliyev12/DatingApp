import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import API from "../../utils/API";
import { IUser } from "../../_models/IUser";

export const getUser = async (id: string) => {
  let user: IUser | null = null;
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `/users/${id}`,
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem("token")}`,
    // },
  };

  const res: void | AxiosResponse<IUser> = await API(options).catch(
    (err: AxiosError) => {
      if (err.response) {
        console.log("Problem With Response ", err.response.status);
      } else if (err.request) {
        console.log("Problem With Request!");
      } else {
        console.log("Error", err.message);
      }
    }
  );

  if (res) user = res.data;
  return user;
};
