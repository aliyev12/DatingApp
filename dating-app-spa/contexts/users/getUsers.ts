import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import API from "../../utils/API";
import { IUser } from "../../_models/IUser";

export const getUsers = async () => {
  let users: IUser[] = [];
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `/users`,
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem("token")}`,
    // },
  };

  const res: void | AxiosResponse<IUser[]> = await API(options).catch(
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

  if (res) users = res.data;
  return users;
};
