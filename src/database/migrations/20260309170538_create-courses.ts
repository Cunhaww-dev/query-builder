import type { Knex } from "knex"; // importação do knex


export async function up(knex: Knex): Promise<void> { // função responsável por enviar a alteração/criação da tabela pro banco de dados
   // createTable() -> método do knex para criar uma tabela
   await knex.schema.createTable("courses", (table) =>{
      table.increments("id").primary(), // id -> chave primária, auto-incrementável
      table.text("name").notNullable(), // name -> campo de texto, não pode ser nulo
      table.timestamp("created_at").defaultTo(knex.fn.now()) // created_at -> campo de data e hora, valor padrão é a data e hora atual
   }) 
}


export async function down(knex: Knex): Promise<void> { // função responsável por desfazer a alteração tabela pro banco de dados
   // dropTable() -> método do knex para deletar uma tabela
   await knex.schema.dropTable("courses") // deleta a tabela "courses"
}

