import { NextFunction, Response, Router } from 'express';
import { createValidator, ExpressJoiInstance, ValidatedRequest } from 'express-joi-validation';
import {
  createUserBodySchema,
  CreateUserRequestSchema,
  GetAllUserRequestSchema,
  getAllUsersQueriesSchema,
  GetUserRequestSchema,
  updateUserBodySchema,
  UpdateUserRequestSchema,
  userIdParamsSchema
} from '../validation';
import { User } from '../type';
import { dbUsers } from '../index';
import { createUserRouterResponse } from './utils';

const userRouter: Router = Router();
const validator: ExpressJoiInstance = createValidator();

userRouter.get(
  '/',
  validator.query(getAllUsersQueriesSchema),
  (
    req: ValidatedRequest<GetAllUserRequestSchema>,
    res: Response,
    next: NextFunction
  ) => {
    const limit: number = parseInt(req.query.limit, 10);
    const loginSubstring = req.query.loginSubstring;

    try {
      const users: User[] = dbUsers.getAll(limit, loginSubstring);

      res.json(
        createUserRouterResponse(
          {
            message: 'Get all',
            users
          },
          { limit }
        )
      );
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        throw error;
      }
      return next(error);
    }
  }
);

userRouter.get(
  '/:id',
  validator.params(userIdParamsSchema),
  (
    req: ValidatedRequest<GetUserRequestSchema>,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.params.id;

    try {
      const user: User | undefined = dbUsers.get(userId);
      res.json(
        createUserRouterResponse({
          message: 'Get',
          user
        })
      );
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        throw error;
      }
      return next(error);
    }
  }
);

userRouter.post(
  '/create',
  validator.body(createUserBodySchema),
  (
    req: ValidatedRequest<CreateUserRequestSchema>,
    res: Response,
    next: NextFunction
  ) => {
    const user: User = req.body;

    try {
      const updatedUser: User = dbUsers.create(user);
      res.json(
        createUserRouterResponse({
          message: 'Created',
          user: updatedUser
        })
      );
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        throw error;
      }
      return next(error);
    }
  }
);

userRouter.post(
  '/update',
  validator.body(updateUserBodySchema),
  (
    req: ValidatedRequest<UpdateUserRequestSchema>,
    res: Response,
    next: NextFunction
  ) => {
    const user: User = req.body;

    try {
      const updatedUser: User = dbUsers.update(user);
      res.json(
        createUserRouterResponse({
          message: 'Updated',
          user: updatedUser
        })
      );
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        throw error;
      }
      return next(error);
    }
  }
);

userRouter.delete(
  '/:id',
  validator.params(userIdParamsSchema),
  (
    req: ValidatedRequest<GetUserRequestSchema>,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.params.id;
    try {
      const removedUser = dbUsers.delete(userId);
      res.json(
        createUserRouterResponse({
          message: 'Removed',
          user: removedUser
        })
      );
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        throw error;
      }
      return next(error);
    }
  }
);

export default userRouter;
