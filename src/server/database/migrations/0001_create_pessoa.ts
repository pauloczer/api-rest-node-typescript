import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.pessoa, table => {
      table.increments('id').primary().unsigned().index();
      table.string('nome').index().notNullable();
      table.string('sobre').index().notNullable();
      table.string('email').unique().notNullable();

      table.integer('cidadeId').unsigned().index().notNullable().references('id').inTable(ETableNames.cidade).onUpdate('CASCADE').onDelete('RESTRICT');



      table.comment('Tabela usada para armazenar pessoas do sistema.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.pessoa}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.pessoa)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.pessoa}`);
    });
}