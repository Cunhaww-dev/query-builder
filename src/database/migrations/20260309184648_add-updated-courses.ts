import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
   await knex.schema.alterTable("courses", (table) => {
      table.timestamp("updated_at").defaultTo(knex.fn.now()).after("created_at") // updated_at -> campo de data e hora, valor padrão é a data e hora atual, posicionado após o campo created_at
   })
}


export async function down(knex: Knex): Promise<void> {
   await knex.schema.alterTable("courses", (table) => {
      table.dropColumn('updated_at') // remove a coluna updated_at da tabela courses
   })
}

// rodar no terminal com npm run knex -- migrate:latest para aplicar a migração e npm run knex migrate:rollback para desfazer a migração