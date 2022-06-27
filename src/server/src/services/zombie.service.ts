import { IZombie, Zombie, ZombieDoc } from '../entities/zombie.entity';
import IZombieService from '../interfaces/zombie.interface';

export default class ZombieService implements IZombieService {
  async list(): Promise<ZombieDoc[]> {
    let dbZombies: ZombieDoc[];

    try {
      dbZombies = await Zombie.find({}).lean();
    } catch (ex) {
      throw new Error(`ZOMBIE fAiLs: ${(ex as Error)?.message}`);
    }

    return dbZombies;
  }

  async create(zombie: IZombie): Promise<ZombieDoc> {
    if (!zombie?.name) {
      throw new Error('nEeD NAME tO cReAtE ZOMBIE!!');
    }

    const dbZombie: ZombieDoc = Zombie.build(zombie);

    try {
      await dbZombie.save();
    } catch (ex) {
      throw new Error(`nEw ZOMBIE fAiL: ${(ex as Error)?.message}`);
    }

    return dbZombie;
  }

  async update(zombieId: string, location: string): Promise<ZombieDoc> {
    if (!location) {
      throw new Error('nEeD NAME tO uPdAtE ZOMBIE!!');
    }

    try {
      const zombie = await Zombie.findById(zombieId);

      if (!zombie) {
        throw new Error(`nO ZOMBIE fOr ${zombieId}`);
      }

      zombie.location = location;

      return await zombie.save();
    } catch (ex) {
      throw new Error(`oLd ZOMBIE fAiL: ${(ex as Error)?.message}`);
    }
  }
}
