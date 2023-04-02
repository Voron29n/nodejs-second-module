import { existsSync, readFileSync } from 'fs';
import { User } from '../type/index';
import { writeFile } from 'fs/promises';
import { createUser, UpdatedUser, updateUsers } from './utils';

type DBUsers = {
  users: User[];
};

const emptyDBUsers = (): DBUsers => ({
  users: []
});

class DatabaseUsers {
  public data: DBUsers;
  private readonly dbPath: string;

  constructor(private readonly dbPathProp: string) {
    this.dbPath = dbPathProp;
    this.data = this.load();
  }

  public getAll = (limit: number, loginSubstring: string): User[] => {
    if (!this.data.users) {
      return [] as User[];
    }
    const users = this.data.users;
    return users
      .sort((o1, o2) => o1.login.localeCompare(o2.login))
      .filter(user => user.login.match(loginSubstring))
      .slice(0, limit || users.length);
  };

  public get = (userId: string): User | undefined => {
    const user = this.data.users.find(({ id }) => id === userId);

    if (!user) {
      throw new Error(`User with id:${userId} does not exist.`);
    }
    return user;
  };

  public update = (data: User): User => {
    const { users, updatedUser }: UpdatedUser = updateUsers(
      this.data.users,
      data
    );

    if (!updatedUser) {
      throw new Error(`User with id:${data.id} does not exist.`);
    }

    this.data = {
      ...this.data,
      users
    };
    this.commit();

    return updatedUser;
  };

  public create = (data: User): User => {
    const { users, updatedUser: createdUser }: UpdatedUser = createUser(
      this.data.users,
      data
    );

    if (!createdUser) {
      throw new Error(`User with id:${data.id} does not exist.`);
    }

    this.data = {
      ...this.data,
      users
    };
    this.commit();

    return createdUser;
  };

  public delete = (id: string) => {
    let removedUser: User = {} as User;
    const users: User[] = this.data.users.map(user => {
      if (user.id === id) {
        removedUser = {
          ...user,
          isDeleted: true
        };
        return removedUser;
      }

      return user;
    });

    if (!removedUser?.id) {
      throw new Error(`User with id:${id} does not exist.`);
    }

    this.data = {
      ...this.data,
      users
    };
    this.commit();
    return removedUser;
  };

  public commit = () => {
    this.persist(this.data).catch(reason => {
      console.log(reason);
    });
  };

  private persist = (data: DBUsers) =>
    writeFile(this.dbPath, JSON.stringify(data), { flag: 'w+' });

  private read = (): DBUsers => {
    const readData: string | undefined = readFileSync(this.dbPath).toString();

    if (!readData) {
      return emptyDBUsers();
    }

    return JSON.parse(readData) as DBUsers;
  };

  private load = (): DBUsers => {
    let current: DBUsers;
    if (!existsSync(this.dbPath)) {
      const initData: DBUsers = {
        users: []
      };
      this.persist(initData).catch(reason => console.log(reason));
      current = initData;
    } else {
      current = this.read();
    }

    return {
      ...current
    };
  };
}

export { DatabaseUsers, emptyDBUsers };
export type { DBUsers };
