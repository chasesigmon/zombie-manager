import express from 'express';
import IZombieService from '../interfaces/zombie.interface';
import ZombieService from '../services/zombie.service';

export default class ZombieController {
  constructor(private app: express.Application) {}

  private zombieSvc: IZombieService = new ZombieService();

  configureRoutes(): void {
    // list zombies
    this.app.route(`/zombies`).get(async (req: express.Request, res: express.Response) => {
      const zombies = await this.zombieSvc.list();
      res.status(200).json(zombies);
    });

    // create zombie
    this.app.route(`/zombie`).post(async (req: express.Request, res: express.Response) => {
      const zombie = await this.zombieSvc.create(req.body);
      res.status(201).json(zombie);
    });

    // update zombie
    this.app.route(`/zombie/:id`).put(async (req: express.Request, res: express.Response) => {
      const { location } = req.body;
      const zombie = await this.zombieSvc.update(req.params.id, location);
      res.status(200).json(zombie);
    });
  }
}
