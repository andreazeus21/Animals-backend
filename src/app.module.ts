import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DogsModule } from './dogs/dogs.module';
import { CatsModule } from './cats/cats.module';
import { BirdsModule } from './birds/birds.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    CatsModule,
    DogsModule,
    BirdsModule
  ],
})
export class AppModule {}
