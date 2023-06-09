import Joi from 'joi';

export const Actor: Joi.Schema = Joi.object({
  name: Joi.string().required(),
});
