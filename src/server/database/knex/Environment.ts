import dotenv from 'dotenv';
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

import {Knex} from 'knex';
import path from 'path';

/*
console.log('HOST:', process.env.HOST);
console.log('USER:', process.env.USER);
console.log('PASSWORD:', process.env.PASSWORD);
console.log('DATABASENAME:', process.env.DATABASENAME);*/

export const development: Knex.Config = {
  client: 'mysql',
  useNullAsDefault: true,
  /* connection: {
    host : process.env.HOST,
    port : process.env.PORTDATABASE ? parseInt(process.env.PORTDATABASE) : undefined,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASENAME,
  }, */
  
  //para fazer migrate
  connection: {
    host : '127.0.0.1',
    port : 3306,
    user : 'paulo',
    password : 'paulo!123',
    database : 'sistema',
  },
 
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, '..', 'seeds'),
  },
  /*pool: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    afterCreate: (connection: any, done: Function) => { 
      connection.raw('SET FOREIGN_KEY_CHECKS=1').then(() => done());
    }
  }
  /*pool: {
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    afterCreate: (connection: any, done: Function) => { 
      connection.run('PRAGMA foreigh_keys =ON ');
      done();
    }
  }*/
};

export const test: Knex.Config = {
  ...development,
  connection: ':memory:',
};

export const production: Knex.Config = {
  ...development
};