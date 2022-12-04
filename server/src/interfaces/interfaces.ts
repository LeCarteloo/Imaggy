import { Router } from 'express';

interface IController {
  path: string;
  router: Router;
}

interface IUser {
  username: string;
  email: string;
  name: string;
  surname: string;
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
  followers: IUser[];
  following: IUser[];
}

export { IUser, IController };
