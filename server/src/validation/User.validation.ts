import Joi from 'joi';

const register = Joi.object({
  _id: Joi.string(),
  email: Joi.string().email().required(),
  username: Joi.string().min(5).max(14).required(),
  avatar: Joi.string(),
  name: Joi.string().required().min(5).max(14),
  password: Joi.string()
    .min(8)
    .max(24)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required()
    .messages({
      'string.pattern.base': `Password should have at least eight characters, at least one letter, one number and one special character`,
    }),
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

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default { register, login };
