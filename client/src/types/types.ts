export interface UserInterface {
  _id: number;
  username: string;
  email: string;
  name: string;
  surname: string;
  avatar?: string;
  bio: string;
  skills: string[];
  interest: string[];
  links: {
    facebook: string;
    instagram: string;
    website: string;
  };
  location?: string;
  followers: UserInterface[];
  following: UserInterface[];
  likedPosts: PostInterface[];
}

export type CommentType = {
  _id: number;
  text: string;
  userId: string;
  postId: string;
  likes: UserInterface[];
};

export interface PostInterface {
  _id: number;
  title: string;
  image: string;
  location: string;
  tags: string[];
  description: string;
  views: number;
  downloads: number;
  device: string;
  users: UserInterface[];
  likes: UserInterface[];
  comments: CommentType[];
}
