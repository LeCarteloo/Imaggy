import Joi from 'joi';

const create = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  image: Joi.string().required(),
  location: Joi.string().max(24),
  tags: Joi.array().max(1).items(Joi.string()),
  device: Joi.string().max(24),
  description: Joi.string().max(250),
});

const update = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  location: Joi.string().max(24),
  tags: Joi.array().max(1).items(Joi.string()),
  device: Joi.string().max(24),
  description: Joi.string().max(250),
});

export default { update, create };
