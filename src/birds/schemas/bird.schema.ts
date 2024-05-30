import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BirdDocument = Bird & Document;

@Schema()
export class Bird {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  species: string;

  @Prop({ required: false })
  family: string;

  @Prop({ required: false })
  habitat: string;

  @Prop({ required: false })
  place_of_found: string;

  @Prop({ required: false })
  diet: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  weight_kg: number;

  @Prop({ required: false })
  height_cm: number;

  @Prop({ required: false })
  image: string;
}

export const BirdSchema = SchemaFactory.createForClass(Bird);
