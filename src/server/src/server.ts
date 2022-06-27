import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import ZombieController from './controllers/zombie.controller';
import { Zombie } from './entities/zombie.entity';
import { ZombieLocation, ZombieGender } from './constants/enums';

// configuration
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

// setup routes
new ZombieController(app).configureRoutes();

// database connection
const mongoDbConnectionString = `${process.env.MONGODB}/${process.env.MONGODB_DBNAME}`;
mongoose.connect(
  mongoDbConnectionString,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`Connected to mongodb at ${mongoDbConnectionString}`);
  }
);

// server connection
const PORT: number = process.env.PORT ? parseInt(process.env.PORT as string, 10) : 7000;

async function seedZombies() {
  const data = await Zombie.find({});

  if (data.length !== 0) {
    // Data exists, no need to seed.
    return;
  }

  try {
    await Zombie.create(
      { name: 'Dracombie', gender: ZombieGender.Male, location: ZombieLocation.Hospital },
      { name: 'Clamper', gender: ZombieGender.Female, location: ZombieLocation.School },
      { name: 'Hyper', gender: ZombieGender.Male, location: ZombieLocation.Warehouse },
      { name: 'Hopper', gender: ZombieGender.Female, location: ZombieLocation.Hospital },
      { name: 'Blubber', gender: ZombieGender.Male, location: ZombieLocation.School },
      { name: 'Bawler', gender: ZombieGender.Female, location: ZombieLocation.Warehouse }
    );
  } catch (ex) {
    console.log(`oG ZOMBIES pRoBleMs: ${(ex as Error)?.message}`);
  }
}

seedZombies();

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
