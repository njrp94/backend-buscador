import { Document, model } from 'mongoose';
import UserSchema from '../schemas/user.schema';

export interface UserDetailDocument extends Document {
    login: String,
    bio: String,
    created_at: Date,
    html_url: String,
    repos: [{ 
        name: String,
        last_updated: Date
      }],
  };

const UserDetail = model<UserDetailDocument>('UserDetail', UserSchema);

export default UserDetail;
