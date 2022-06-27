import mongoose from 'mongoose';
import { ZombieLocation } from '../constants/enums';

interface IZombie {
  _id: string;
  name: string;
  location: string;
  gender?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ZombieDoc extends mongoose.Document {
  _id: string;
  name: string;
  location: string;
  gender?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ZombieModelInterface extends mongoose.Model<ZombieDoc> {
  build(zombie: IZombie): ZombieDoc;
}

const ZombieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    location: {
      type: String,
      enum: ZombieLocation,
      default: ZombieLocation.Warehouse,
      required: true,
    },
    gender: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      required: false,
    },
    updatedAt: {
      type: Date,
      required: false,
    },
  },
  { collection: 'zombies' }
);

ZombieSchema.statics.build = (zombie: IZombie): ZombieDoc => {
  zombie.createdAt = new Date();
  zombie.updatedAt = new Date();
  return new Zombie(zombie);
};

const Zombie = mongoose.model<ZombieDoc, ZombieModelInterface>('Zombie', ZombieSchema);

export { IZombie, Zombie, ZombieDoc };
