import express from 'express';
import type { Request, Response } from 'express';
import { knex } from './database/knex'; // importação do knex para usar a conexão com o banco de dados

const app = express();
app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'Hello World :)' });
});

app.post('/courses', async (req: Request, res: Response) => {
  const { name } = req.body;

  //   await knex('courses').insert({ name }); // inserindo um novo curso na tabela "courses" do banco de dados

  // Insert Raw
  await knex.raw('INSERT INTO courses (name) VALUES (?)', [name]); // inserindo um novo curso na tabela "courses" do banco de dados usando raw query do knex
  res.status(210).json({ name });
});

app.listen(3333, () => console.log('Server is running on port 3333'));
