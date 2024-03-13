import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { CidadesProvider } from '../../database/providers/cidades';
import { validation } from '../../shared/middleware';


interface IQueryProps {
  id?: number | null | undefined;
  page?: number | null | undefined;
  limit?: number | null | undefined;
  filter?: string | null | undefined;
}
export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().notRequired().moreThan(0),
    limit: yup.number().notRequired().moreThan(0),
    id: yup.number().integer().notRequired().default(0),
    filter: yup.string().notRequired(),
  })),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  const filter = req.query.filter ?? ''; // Use uma string vazia se req.query.filter for null ou undefined

  const result = await CidadesProvider.getAll(req.query.page || 1, req.query.limit || 7, filter, Number(req.query.id));
  const count = await CidadesProvider.count(filter);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message }
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message }
    });
  }

  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', count);

  return res.status(StatusCodes.OK).json(result);
};