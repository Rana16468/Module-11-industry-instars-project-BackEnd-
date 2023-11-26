import express, { Request,Response } from 'express';
import cors from 'cors';
import { UserRouter } from './app/models/user/user.router';
import { StudentRouter } from './app/models/student/student.router';

const app = express();

//parser
app.use(express.json());
//middlwere
app.use(cors());

app.use('/api/v1/student',StudentRouter);
app.use('/api/v1/user',UserRouter);


app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

export default app;