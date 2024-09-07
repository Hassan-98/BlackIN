export interface IUser {
  id: string;
  name: string;
  email: string;
  picture: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
  uid: string;
}