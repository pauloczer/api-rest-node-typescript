/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AnyObject, Maybe, ObjectSchema, ValidationError } from 'yup';

type TProperty = 'body' | 'header' | 'params' | 'query';

type TGetSchema = <T extends Maybe<AnyObject>>(schema: ObjectSchema<T>) => ObjectSchema<T>

type TALLShemas = Record<TProperty, ObjectSchema<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TALLShemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation:TValidation = (getAllSchemas) => async (req, res, next) => {
  const schemas = getAllSchemas(schema => schema);

  const errorResult: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(([key, schema]) =>{
    try {
      schema.validateSync(req[key as TProperty], { abortEarly: false });
      
    } catch (err) {
      const yupError = err as ValidationError;
      const errors: Record<string, string> = {};
  
      yupError.inner.forEach(error => {
        if(!error.path) return; //if(!error.path === undefined) é a mesma coisa
        errors[error.path] = error.message;
      });
  
      errorResult[key] = errors;
    }
  });

  if(Object.entries(errorResult).length === 0){
    return next();

  }else{
    return res.status(StatusCodes.BAD_REQUEST).json({errors: errorResult});
  }

};
