import { Schema } from 'mongoose';

const UserSchema = new Schema({
  login: String,
  bio: String,
  created_at: Date,
  html_url: String,
  repos: [{ 
      name: String,
      last_updated: Date
    }],
});

export default UserSchema;
