export const logout = (): void => {
  window.localStorage.removeItem("token");
  console.log("logged out");
};
