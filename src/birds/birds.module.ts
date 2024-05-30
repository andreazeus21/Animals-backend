import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Bird, BirdSchema } from './schemas/bird.schema';
import { BirdsController } from './birds.controller';
import { BirdsService } from './birds.service';




@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bird.name, schema: BirdSchema }]),
  ],
  providers: [BirdsService],
  controllers: [BirdsController],
})
export class BirdsModule {}