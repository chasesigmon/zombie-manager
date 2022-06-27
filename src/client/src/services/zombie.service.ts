import axios from 'axios';

export default class ZombieService {
  async create(name: string, gender: string, location: string): Promise<void> {
    await axios.post(
      `http://localhost:3555/zombie`,
      { name, gender, location },
    );
  }

  async update(id: string, location: string): Promise<void> {
    await axios.put(
      `http://localhost:3555/zombie/${id}`,
      { location },
    );
  }
}
