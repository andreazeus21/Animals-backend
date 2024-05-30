import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CatDocument = Cat & Document;

@Schema()
export class Cat {
  @Prop({ required: true })
  name: string;

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

export const CatSchema = SchemaFactory.createForClass(Cat);
