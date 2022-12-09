import { Router } from 'express';
import mongoose, { Document } from 'mongoose';

interface Controller {
  path: string;
  router: Router;
}

interface Token {
  id: mongoose.Schema.Types.ObjectId;
  expiresIn: number;
}

interface User extends Document {
  username: string;
  email: string;
  name: string;
  surname: string;
  password: string;
  avatar?: string;
  bio: string;
  isPro: boolean;
  profileBg: string;
  skills: string[];
  interest: string[];
  links: {
    facebook: string;
    instagram: string;
    website: string;
  };
  location?: string;
  followers?: User[];
  following?: User[];
  token: string;
}

export { User, Token, Controller };
