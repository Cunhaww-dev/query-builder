import express from 'express';
import type { Request, Response } from 'express';

const app = express()
app.use(express.json())

app.get('/', async (req: Request, res: Response) => {
   res.json({ message: "Hello World :)"})
})

app.listen(3333, () => console.log('Server is running on port 3333'))