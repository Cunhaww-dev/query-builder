import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Método Insert e nome da tabela onde os dados serão inseridos, no caso 'courses', e um array de objetos com os dados a serem inseridos.
  await knex('courses').insert([
    { name: 'CSS' },
    { name: 'JavaScript' },
    { name: 'Python' },
    { name: 'Java' },
    { name: 'C++' },
    { name: 'C#' },
    { name: 'Go' },
    { name: 'Rust' },
    { name: 'Swift' },
    { name: 'Kotlin' },
    { name: 'Node' },
    { name: 'Express' },
    { name: 'GIT' },
    { name: 'Github' },
    { name: 'React' },
    { name: 'Angular' },
  ]);
}
