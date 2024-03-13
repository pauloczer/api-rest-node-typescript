import { describe, test, expect, it } from '@jest/globals';
import { testServer } from '../jest.setup';


describe('Cidades - Create', () =>{


  it('Cria registro', async () => {

    const res1 = await testServer.post('/cidades').send({  nome: 'São Paulo' });
    
    expect('a').toEqual('b');

  });
});