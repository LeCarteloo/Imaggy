import { Post } from '@/interfaces/interfaces';
import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: '',
  },
  tags: [{ type: String }],
  description: {
    type: String,
    default: '',
  },
  device: {
    type: String,
    default: '',
  },
  views: {
    type: Number,
    default: 0,
  },
  downloads: {
    type: Number,
    default: 0,
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  ],
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model<Post>('Post', PostSchema);
