// TODO: Later change id to _id (json-server doesnt support _id)
export interface UserInterface {
  id: number;
  username: string;
  email: string;
  name: string;
  surname: string;
  avatar?: string;
  bio: string;
  isPro: boolean;
  profileBg: string;
  posts: PostInterface[];
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
  id: number;
  text: string;
  userId: string;
  postId: string;
  likes: UserInterface[];
};

export interface PostInterface {
  id: number;
  title: string;
  image: string;
  location: string;
  tags: string[];
  description: string;
  views: number;
  downloads: number;
  device: string;
  user: UserInterface;
  likes: UserInterface[];
  comments: CommentType[];
}
