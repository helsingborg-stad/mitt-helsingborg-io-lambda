import Joi from 'joi';
import globalSchema from './global';

// Build your endpoint-specific schema here.
const body = Joi.object().keys({
  id: globalSchema.id,
});

export default {
  body,
};
