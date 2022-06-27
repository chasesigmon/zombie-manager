import { IZombie } from '../entities/zombie.entity';

export default interface IZombieService {
  list(): Promise<IZombie[]>;
  create(zombie: IZombie): Promise<IZombie>;
  update(zombieId: string, location: string): Promise<IZombie>;
}
