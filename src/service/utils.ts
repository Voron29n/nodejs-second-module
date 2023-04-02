import { User } from '../type';

export type UpdatedUser = {
  users: User[];
  updatedUser: User | undefined;
}

export const createUser = (users: User[], data: User): UpdatedUser => {
  const newUserId: string = (users.length || 1).toString();
  const newUser: User = {
    ...data,
    id: newUserId,
    isDeleted: false
  } as User;

  return {
    users: [...users, newUser],
    updatedUser: newUser
  };
};

export const updateUsers = (users: User[], data: User): UpdatedUser => {
  let updatedUser: User = {} as User;
  const updatedUsers = users.reduce<User[]>(
    (acc: Array<User>, curr: User): User[] => {
      if (data.id === curr.id) {
        acc.push(data);
        updatedUser = data;
      } else {
        acc.push(curr);
      }

      return acc;
    },
    []
  );
  return {
    users: updatedUsers,
    updatedUser
  };
};
