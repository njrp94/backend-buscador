import { Request, Response } from 'express';
import UserDetail from '../models/user.model';
import axios from 'axios';

export const getUserDetails = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const userResponse = await axios.get(`https://api.github.com/users/${username}`);
    const userRepos = await axios.get(`https://api.github.com/users/${username}/repos`);

    const userData = userResponse.data;
    const reposData = userRepos.data.map((repo) => ({
        name: repo.name,
        last_updated: repo.updated_at,
        }));

    const userDetail = new UserDetail({
      login: userData.login,
      bio: userData.bio,
      created_at: new Date(),
      html_url: userData.html_url,
      repos: reposData,
    });

    await userDetail.save();
    res.json({ userData, reposData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
