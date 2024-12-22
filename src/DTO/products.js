import Joi from "joi";

export const productDto = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).optional(), 
  thumbnail: Joi.string().max(100).optional(),
  code: Joi.string().max(100),
  stock: Joi.number().integer().min(0).required(), 
  price: Joi.number().positive().precision(2).required(), 
  status: Joi.boolean(),
  category: Joi.string().required(),
});
