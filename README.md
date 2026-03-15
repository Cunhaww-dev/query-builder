# Query Builder Study

Projeto de estudo com foco no uso do Query Builder do Knex em uma API Node.js com Express, TypeScript e SQLite.

O objetivo principal deste projeto foi praticar:

- Criacao de tabelas com migrations
- Insercao de dados com seeds
- Consultas com `select`, `insert`, `where` e `join`
- Relacionamento entre tabelas usando chave estrangeira
- Integracao do Knex com uma API REST simples

## Tecnologias

- Node.js
- TypeScript
- Express
- Knex
- SQLite3
- TSX

## Estrutura do banco

Atualmente o projeto trabalha com duas tabelas principais:

- `courses`
  - `id`
  - `name`
  - `created_at`
  - `updated_at`

- `course_modules`
  - `id`
  - `name`
  - `course_id`

O relacionamento entre elas e:

- Um curso pode ter varios modulos
- Cada modulo pertence a um curso

## Como rodar o projeto

Instale as dependencias:

```bash
npm install
```

Inicie o servidor em desenvolvimento:

```bash
npm run dev
```

O servidor sobe na porta `3333`.

## Configuracao do banco

O projeto usa SQLite com configuracao no arquivo [`knexfile.ts`](/home/lucasfabri/projects/studies/query-builder/knexfile.ts).

Se estiver rodando o projeto dentro do WSL, o ideal e manter o banco em um caminho acessivel e consistente para o ambiente em que a aplicacao esta sendo executada.

Exemplo de caminho:

```ts
filename: '/mnt/c/dev/db/database.db'
```

Antes de usar esse caminho, garanta que a pasta e o arquivo existem:

```bash
mkdir -p /mnt/c/dev/db
touch /mnt/c/dev/db/database.db
```

## Migrations

Criar uma nova migration:

```bash
npm run knex -- migrate:make nome-da-migration
```

Rodar as migrations:

```bash
npm run knex -- migrate:latest
```

Desfazer a ultima migration:

```bash
npm run knex -- migrate:rollback
```

## Seeds

Criar uma nova seed:

```bash
npm run knex -- seed:make nome-da-seed
```

Rodar as seeds:

```bash
npm run knex -- seed:run
```

No projeto existe uma seed para popular a tabela `courses` com alguns cursos iniciais.

## Endpoints

### `GET /`

Retorna uma mensagem simples de teste da API.

### `POST /courses`

Cria um novo curso.

Exemplo de body:

```json
{
  "name": "TypeScript"
}
```

### `POST /modules`

Cria um novo modulo relacionado a um curso.

Exemplo de body:

```json
{
  "name": "Introducao ao Knex",
  "course_id": 1
}
```

### `GET /modules`

Lista todos os modulos cadastrados.

### `GET /courses/:id/modules`

Lista os modulos de um curso especifico usando `join` entre `courses` e `course_modules`.

## Exemplos de Query Builder usados no projeto

Insercao com Query Builder:

```ts
await knex('course_modules').insert({ name, course_id });
```

Consulta simples:

```ts
const modules = await knex('course_modules').select();
```

Consulta com filtro:

```ts
.where('courses.id', req.params.id)
```

Consulta com `join`:

```ts
const courses = await knex('courses')
  .select(
    'courses.id as course_id',
    'course_modules.id as course_module_id',
    'course_modules.name as module',
    'courses.name as course',
  )
  .join('course_modules', 'courses.id', 'course_modules.course_id')
  .where('courses.id', req.params.id);
```

## Aprendizados

Durante o desenvolvimento deste projeto, os principais pontos praticados foram:

- Diferenca entre migrations e seeds
- Uso de `import type` em ambiente ESM com TypeScript
- Cuidados com caminhos de banco no WSL
- Como evitar ambiguidade de colunas em `join`
- Como relacionar tabelas com foreign key usando Knex
- Como estruturar uma API REST simples com Express
- Como integrar o Knex ao fluxo da aplicacao
- Como criar tabelas com chave primaria auto-incremental
- Como adicionar novas colunas com `alterTable`
- Como popular o banco com dados iniciais usando seeds
- Como usar `insert` com Query Builder e tambem com SQL raw
- Como entender a diferenca entre os metodos do Knex e o uso de `knex.raw`
- Como retornar dados filtrados por parametro de rota
- Como listar registros relacionados entre tabelas
- Como organizar a camada de banco em arquivos separados
- Como usar aliases em colunas para deixar o retorno do `join` mais claro
- Como depurar erros de configuracao do Knex e do SQLite
