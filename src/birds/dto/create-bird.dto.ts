import { IsString, IsInt, IsArray } from 'class-validator';

export class CreateBirdDto {
  @IsString()
  readonly species: string;

  @IsString()
  readonly family: string;

  @IsString()
  readonly habitat: string;

  @IsString()
  readonly place_of_found: string;

  @IsString()
  readonly diet: string;

  @IsString()
  readonly description: string;

  @IsInt()
  readonly weight_kg: number;

  @IsInt()
  readonly height_cm: number;

  @IsString()
  readonly image: string;
}