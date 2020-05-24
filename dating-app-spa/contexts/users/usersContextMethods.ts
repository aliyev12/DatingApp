import { getUsers } from "./getUsers";

export const initUsers = async (setUsers: any) => {
  const newUsers = await getUsers();
  setUsers(newUsers);
};

// export const handleLoggedIn = (
//   state: any,
//   setState: any,
//   tokenFromEndpoint?: string
// ): void => {
//   const token = tokenFromEndpoint
//     ? tokenFromEndpoint
//     : localStorage.getItem("token");
//   const tokenDetails = handleToken(token);

//   setState({
//     ...state,
//     isLoggedIn: tokenDetails.tokenIsValid,
//     user: tokenDetails.tokenData,
//   });
// };

// export function logout(state: any, setState: any): void {
//   window.localStorage.removeItem("token");
//   setState({
//     ...state,
//     user: null,
//     isLoggedIn: false,
//   });
// }
// // export const logout = (state: any, setState: any): void => {
// //   window.localStorage.removeItem("token");
// //   setState({
// //     ...state,
// //     user: null,
// //     isLoggedIn: false,
// //   });
// // };
