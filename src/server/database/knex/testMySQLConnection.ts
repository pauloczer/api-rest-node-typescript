/*import { Knex } from 'knex';

// Função para testar a conexão com o MySQL
export async function testMySQLConnection(config: Knex.Config) {
  console.log('Tentando conectar ao MySQL...');
  const knex = Knex(config);

  try {
    // Tenta realizar uma consulta simples para verificar a conexão
    const result = await knex.raw('SELECT 1 + 1 as result');
    console.log('Conexão bem-sucedida:', result[0][0].result === 2);
  } catch (error) {
    console.error('Erro ao conectar:', error);
  } finally {
    // Fecha a conexão após o teste
    await knex.destroy();
    console.log('Conexão encerrada.');
  }
}*/
