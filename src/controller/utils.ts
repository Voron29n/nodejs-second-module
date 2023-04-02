import { User } from '../type';

export type UserRouterResponse = {
  success: boolean;
  status: number;
  message: string;
  user?: User;
  users?: User[];
};

type UserResponse = {
  message: string;
  user?: User;
  users?: User[];
};

export const createUserRouterResponse = (
  { users, user, message }: UserResponse,
  otherProps?: object
): UserRouterResponse => {
  const defaultResponse = {
    success: true,
    status: 200,
    message,
    ...otherProps
  };

  if (!users && !user) {
    throw new Error('Can not create user response.');
  }

  return !user
    ? {
      ...defaultResponse,
      users
    }
    : {
      ...defaultResponse,
      user
    };
};
