import { User } from '@/interfaces/interfaces';
import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: '',
      required: true,
    },
    surname: {
      type: String,
      default: '',
      required: true,
    },
    bio: {
      type: String,
      default: '',
    },
    isPro: {
      type: Boolean,
      default: false,
      required: true,
    },
    skills: [
      {
        type: String,
      },
    ],
    interest: [
      {
        type: String,
      },
    ],
    links: {
      facebook: {
        type: String,
        default: '',
      },
      instagram: {
        type: String,
        default: '',
      },
      website: {
        type: String,
        default: '',
      },
    },
    location: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
    profileBg: {
      type: String,
      default: '',
    },
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<User>('User', UserSchema);
