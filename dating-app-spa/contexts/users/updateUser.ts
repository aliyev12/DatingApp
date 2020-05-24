import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import API from "../../utils/API";
import { IUser } from "../../_models/IUser";
import { IEditUserValues } from "../../_models";

export const updateUser = async (id: string, values: IEditUserValues) => {
  const options: AxiosRequestConfig = {
    method: "PUT",
    url: `/users/${id}`,
    data: values,
  };
  return await API(options);
  // .catch(
  //   (err: AxiosError) => {
  //     if (err.response) {
  //       console.log("Problem With Response ", err.response.status);
  //     } else if (err.request) {
  //       console.log("Problem With Request!");
  //     } else {
  //       console.log("Error", err.message);
  //     }
  //   }
  // );
};
