import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import axios from 'axios';
import { Cat, CatDocument } from './schemas/cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';


@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(search?: string): Promise<Cat[]> {
    if (search) {
      return this.catModel.find({ name: { $regex: search, $options: 'i' } }).exec();
    }
    return this.catModel.find().exec();
  }

  async findOne(id: string): Promise<Cat> {
    const cat = await this.catModel.findOne({ _id: id }).exec();
    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return cat;
  }

  async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    const updatedCat = await this.catModel.findOneAndUpdate({ _id: id }, updateCatDto, { new: true }).exec();
    if (!updatedCat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return updatedCat;
  }

  async remove(id: string): Promise<void> {
    console.log(`Attempting to delete cat with id: ${id}`);
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid ID');
    }

    const objectId = new Types.ObjectId(id);
    const result = await this.catModel.deleteOne({ _id: objectId }).exec();
    if (result.deletedCount === 0) {
      console.log(`No cat found with id: ${id}`);
      throw new NotFoundException('Cat not found');
    } else {
      console.log(`Cat deleted with id: ${id}`);
    }
  }

  async populateCatsFromApi(): Promise<void> {
    try {
      const response = await axios.get('https://freetestapi.com/api/v1/cats');
      const cats = response.data;

      const catPromises = cats.map((cat: CreateCatDto) => {
        const createdCat = new this.catModel(cat);
        return createdCat.save();
      });

      await Promise.all(catPromises);
    } catch (error) {
      console.error('Error fetching cats from API:', error);
      throw new Error('Failed to fetch and populate cats from API');
    }
  }
}
