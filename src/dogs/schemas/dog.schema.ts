import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DogDocument = Dog & Document;

@Schema()
export class Dog {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  breed_group: string;

  @Prop({ required: false })
  size: string;

  @Prop({ required: false })
  lifespan: string;

  @Prop({ required: false })
  origin: string;

  @Prop({ required: false })
  temperament: string;

  @Prop({ type: [String], required: false })
  colors: string[];

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  image: string;
}

export const DogSchema = SchemaFactory.createForClass(Dog);
