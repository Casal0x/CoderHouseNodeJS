export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isValidPassword?: any;
  age: number;
  phone: string;
  image?: string;
  role: string;
}
