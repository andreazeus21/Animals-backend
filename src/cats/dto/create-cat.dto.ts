import { IsString, IsInt, IsArray } from 'class-validator';

export class CreateCatDto {
  @IsString()
  readonly name: string;

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
