import Joi from 'joi';

const register = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(5).max(14).required(),
  avatar: Joi.string(),
  name: Joi.string().required().min(5).max(14),
  password: Joi.string().required(),
  surname: Joi.string().required().min(5).max(14),
  bio: Joi.string().max(250),
  profileBg: Joi.string(),
  skills: Joi.array().max(7).items(Joi.string()),
  interest: Joi.array().max(7).items(Joi.string()),
  links: {
    facebook: Joi.string(),
    instagram: Joi.string(),
    website: Joi.string(),
  },
  location: Joi.string().max(24),
});

export default { register };
