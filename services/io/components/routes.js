import express from 'express';
import { success } from '../../../libs/response-lib';

import bankidAuth from './bankidAuth/api';

const routes = () => {
  const router = express.Router();

  router.get('/', async (req, res) => res.json(
    success({
      jsonapi: {
        version: '1.0',
        meta: {
          service: 'mitt-helsingborg-io',
          owner: 'Helsingborg Stad',
          description: 'Main touchpoint for mitt helsingborg app, webpage and assistants.',
        },
      },
    })
  ));

  router.use('/auth/bankid', bankidAuth);

  return router;
};

export default routes;