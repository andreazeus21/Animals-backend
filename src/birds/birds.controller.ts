import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { CreateBirdDto } from './dto/create-bird.dto';
import { Bird } from './schemas/bird.schema';
import { UpdateBirdDto } from './dto/update-bird.dto';
import { BirdsService } from './birds.service';



@Controller('birds')
export class BirdsController {
  constructor(private readonly birdsService: BirdsService) {}

  @Post()
  create(@Body() createBirdDto: CreateBirdDto): Promise<Bird> {
    return this.birdsService.create(createBirdDto);
  }

  @Get()
  findAll(@Query('search') search?: string): Promise<Bird[]> {
    return this.birdsService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Bird> {
    return this.birdsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBirdDto: UpdateBirdDto): Promise<Bird> {
    return this.birdsService.update(id, updateBirdDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.birdsService.remove(id);
  }

  @Post('populate')
  async populate(): Promise<void> {
    await this.birdsService.populateBirdsFromApi();
  }
}
