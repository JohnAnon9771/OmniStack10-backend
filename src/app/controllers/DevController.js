import axios from 'axios';
import Dev from '../models/Dev';

import parseStringAsArray from '../utils/parseStringAsArray';

export default {
  async index(req, res) {
    const devs = await Dev.find({});
    return res.json(devs);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;
    const dev = await Dev.findOne({ github_username });
    if (dev) {
      return res.status(400).json({ error: 'Dev already exists' });
    }

    const { data } = await axios.get(
      `https://api.github.com/users/${github_username}`
    );
    const { name = login, bio, avatar_url } = data;

    const techArray = parseStringAsArray(techs);

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    };

    const response = await Dev.create({
      name,
      github_username,
      bio,
      avatar_url,
      techs: techArray,
      location
    });

    return res.json(response);
  }
};
