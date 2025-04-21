import { User } from '@prisma/client';
import { Request } from 'express';

export interface Payload extends Request {
  payload: User;
}
