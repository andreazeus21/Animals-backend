import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Dog } from './schemas/dog.schema';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Post()
  create(@Body() createDogDto: CreateDogDto): Promise<Dog> {
    return this.dogsService.create(createDogDto);
  }

  @Get()
  findAll(@Query('search') search?: string): Promise<Dog[]> {
    return this.dogsService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Dog> {
    return this.dogsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDogDto: UpdateDogDto): Promise<Dog> {
    return this.dogsService.update(id, updateDogDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.dogsService.remove(id);
  }

  @Post('populate')
  async populate(): Promise<void> {
    await this.dogsService.populateDogsFromApi();
  }
}
