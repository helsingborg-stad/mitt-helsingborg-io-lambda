import express from 'express';

import bankid from './dal';
import authSchemas from './validationSchemas/index';
import schemaValidator from '../middlewares/schemaValidator';

const router = express.Router();

const validateRequest = schemaValidator(true, authSchemas);

router.post('/', async (req, res) => bankid.auth(req, res));
router.post('/collect', validateRequest, async (req, res) => bankid.collect(req, res));
router.post('/sign', async (req, res) => bankid.sign(req, res));
router.delete('/cancel', async (req, res) => bankid.cancel(req, res));

export default router;
