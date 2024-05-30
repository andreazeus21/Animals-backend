import { IsString, IsInt, IsArray } from 'class-validator';

export class CreateDogDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly breed_group: string;

  @IsString()
  readonly size: string;

  @IsString()
  readonly lifespan: string;

  @IsString()
  readonly origin: string;

  @IsString()
  readonly temperament: string;

  @IsArray()
  readonly colors: string[];

  @IsString()
  readonly description: string;

  @IsString()
  readonly image: string;
}
