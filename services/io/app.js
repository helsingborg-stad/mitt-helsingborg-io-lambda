import serverless from 'serverless-http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './components/routes';

const app = express();
app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Mitt Helsingborg touchpoint'));
app.use('/api/v1', routes());

export const handler = serverless(app);
