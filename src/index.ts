import { DatabaseUsers } from './service';
import path from 'node:path';
import express, { Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const rootPath: string = process.cwd();
const dbEnvPath = process.env.DB_USERS_PATH || '';
const envPort = process.env.PORT;
const dbUsers: DatabaseUsers = new DatabaseUsers(path.join(rootPath, dbEnvPath));
const app: Express = express();

export {
  rootPath, dbUsers, app, envPort
};

