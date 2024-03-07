import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middleware';


interface IQueryProps {
  page?: number | null | undefined;
  limit?: number | null | undefined;
  filter?: string | null | undefined;
}



export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().notRequired().moreThan(0),
    limit: yup.number().notRequired().moreThan(0),
    filter: yup.string().notRequired(),
  })),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) =>{

  console.log(req.query);


  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado!');
};