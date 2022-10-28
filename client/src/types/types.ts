export interface UserInterface {
  _id: number;
  email: string;
  name: string;
  surname: string;
  avatar: string;
  bio: string;
  skills: string[] | [];
  interest: string[] | [];
  links: {
    facebook: string;
    instagram: string;
    website: string;
  };
  location?: string;
  followers: string[] | [];
  following: string[] | [];
}
