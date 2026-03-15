import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('course_modules', (table) => {
    table.increments('id').primary(),
      table.string('name').notNullable(),
      // Criando uma coluna para ser uma FK para relacionar ocm o ID da tabela de cursos. Deve ser do mesmo tipo da coluna que é a PK da tabela de cursos, ou seja, um inteiro auto-incrementável.
      table
        .integer('course_id')
        .notNullable()
        .references('id')
        .inTable('courses');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('course_modules');
}
