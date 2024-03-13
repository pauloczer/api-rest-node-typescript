import { ICidade } from '../../models';
import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';

export const getAll = async (page: number, limit: number, filter: string, id?: string): Promise<ICidade[] | Error | undefined> => {
  try {
    let idFilter: number | undefined;
    if (id !== undefined && typeof id === 'string' && id.trim() !== '') {
      idFilter = Number(id.trim());
    }

    const result = await Knex(ETableNames.cidade)
      .select('*')
      .where(builder => {
        if (idFilter !== undefined) {
          builder.where('id', idFilter);
        }
        builder.orWhere('nome', 'like', `%${filter}%`);
      })
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};
