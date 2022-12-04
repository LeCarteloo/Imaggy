import { IUser } from '@/interfaces/interfaces';
import mongoose, { Schema, Document } from 'mongoose';

export interface IUserModel extends IUser, Document {}

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
        ref: 'user',
      },
    ],
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IUserModel>('User', UserSchema);
