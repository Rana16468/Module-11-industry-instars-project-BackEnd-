import express, { Request,Response } from 'express';
import cors from 'cors';

import router from './app/router';
import globalErrorHandelar from './app/middlewere/globalErrorHandelar';
import NotFound from './app/middlewere/NotFound';

const app = express();

//parser
app.use(express.json());
//middlwere
app.use(cors());

app.use('/api/v1',router);


app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
});
// Not Found Router
app.use(NotFound);
app.use(globalErrorHandelar);

export default app;