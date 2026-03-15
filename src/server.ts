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

app.post('/modules', async (req: Request, res: Response) => {
  const { name, course_id } = req.body;

  await knex('course_modules').insert({ name, course_id }); // inserindo um novo módulo na tabela "course_modules" do banco de dados usando o método insert do knex

  return res.status(201).json({ name, course_id });
});

app.get('/modules', async (req: Request, res: Response) => {
  const modules = await knex('course_modules').select();

  if (modules.length === 0) {
    return res.status(404).json({ message: 'No modules found' });
  }

  return res.json(modules);
});

app.get('/courses/:id/modules', async (req: Request, res: Response) => {
  const courses = await knex('courses')
    .select(
      'courses.id AS course_id',
      'course_modules.id AS course_module_id',
      'course_modules.name AS module',
      'courses.name AS course',
    )
    .join('course_modules', 'courses.id', 'course_modules.course_id')
    .where('courses.id', req.params.id); // Linha adicionada para selecionar apenas os módulos de determinado curso

  return res.json(courses);
});

app.listen(3333, () => console.log('Server is running on port 3333'));
