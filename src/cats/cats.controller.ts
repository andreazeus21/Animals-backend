import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './schemas/cat.schema';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatsService } from './cats.service';


@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll(@Query('search') search?: string): Promise<Cat[]> {
    return this.catsService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Cat> {
    return this.catsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): Promise<Cat> {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.catsService.remove(id);
  }

  @Post('populate')
  async populate(): Promise<void> {
    await this.catsService.populateCatsFromApi();
  }
}
