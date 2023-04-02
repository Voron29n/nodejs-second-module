import Joi from 'joi';
import pkg, { ValidatedRequestSchema } from 'express-joi-validation';

const { ContainerTypes } = pkg;
const userIdParamsSchema = Joi.object({
  id: Joi.string().required()
});

const getAllUsersQueriesSchema = Joi.object({
  limit: Joi.number().integer().min(0).optional(),
  loginSubstring: Joi.string().optional()
});

const createUserBodySchema = Joi.object({
  id: Joi.number().min(0).allow(null).default(null),
  login: Joi.string().required(),
  password: Joi.string().required(),
  age: Joi.number().min(4).max(130).integer().required(),
  isDeleted: Joi.boolean().allow(null).default(null)
});

const updateUserBodySchema = Joi.object({
  id: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().required(),
  age: Joi.number().min(4).max(130).integer().required(),
  isDeleted: Joi.boolean().required()
});


interface GetAllUserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    limit: string;
    loginSubstring: string;
  };
}

interface GetUserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {
    id: string;
  };
}

interface DeleteUserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {
    id: string;
  };
}

interface CreateUserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    login: string;
    password: string;
    age: number;
  };
}

interface UpdateUserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
  };
}

export { getAllUsersQueriesSchema, createUserBodySchema, userIdParamsSchema, updateUserBodySchema };

export type {
  GetAllUserRequestSchema,
  CreateUserRequestSchema,
  GetUserRequestSchema,
  DeleteUserRequestSchema,
  UpdateUserRequestSchema
};
