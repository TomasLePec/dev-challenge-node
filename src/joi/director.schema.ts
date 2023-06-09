import Joi from "joi";

export const Director: Joi.Schema = Joi.object({
  name: Joi.string().required(),
})