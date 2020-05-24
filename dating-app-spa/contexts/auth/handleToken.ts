import jwtDecode from "jwt-decode";
import { IToken } from "../../_models";

export const handleToken = (token: string | null) => {
  let tokenIsValid = false;
  let tokenData = null;

  try {
    if (token) {
      const decodedToken: IToken = jwtDecode(token);
      const expirationTime = decodedToken ? decodedToken.exp * 1000 : 0;
      const currentTime = Date.now();
      const expired = expirationTime < currentTime;
      if (!expired) {
        tokenIsValid = true;
        tokenData = decodedToken;
      }
    }
  } catch (err) {
    tokenIsValid = false;
    tokenData = null;
  }

  return { tokenIsValid, tokenData };
};
