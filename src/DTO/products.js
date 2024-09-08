import Joi from "joi";

export const productDto = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).optional(), 
  price: Joi.number().positive().precision(2).required(), 
  category: Joi.string().required(),
  stock: Joi.number().integer().min(0).required(), 
  image: Joi.string().uri().optional(), 
});
