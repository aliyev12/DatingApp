export interface ILoginValues {
  username: string;
  password: string;
}

export interface ILoginStatus {
  status: string;
  message?: string | null;
  token?: string | null;
}
