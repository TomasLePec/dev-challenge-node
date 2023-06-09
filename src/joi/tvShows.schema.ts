import Joi from 'joi';

export const TVShowGenerator: Joi.Schema = Joi.object({
  name: Joi.string().required(),
  seasons: Joi.number().required(),
  episodes: Joi.number().required(),
});
