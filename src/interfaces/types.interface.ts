import { Request } from 'express';
import { IUser } from './user.interface';

export interface MRequest extends Request {
  user: IUser;
}
