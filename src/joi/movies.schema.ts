import Joi from "joi";

export const Movie: Joi.Schema = Joi.object({
  title: Joi.string().required(),
  director: Joi.string().required(),
  cast: Joi.array().items(Joi.string().required())
})