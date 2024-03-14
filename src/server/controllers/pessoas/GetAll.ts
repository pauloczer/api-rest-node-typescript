import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { PessoasProvider } from './../../database/providers/pessoas';
import { validation } from '../../shared/middleware';


interface IQueryProps {
  page?: number | null | undefined;
  limit?: number | null | undefined;
  filter?: string | null | undefined;
}
export const getAllValidation = validation(get => ({
  query: get<IQueryProps>(yup.object().shape({
    filter: yup.string().notRequired().default(''),
    page: yup.number().integer().notRequired().moreThan(0).default(1),
    limit: yup.number().integer().notRequired().moreThan(0).default(7),
  })),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  const page = req.query.page ?? 1;
  const limit = req.query.limit ?? 7;
  const filter = req.query.filter ?? '';

  const result = await PessoasProvider.getAll(page, limit, filter);
  const count = await PessoasProvider.count(filter);

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