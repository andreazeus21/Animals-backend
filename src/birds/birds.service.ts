import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import axios from 'axios';
import { Bird, BirdDocument } from './schemas/bird.schema';
import { CreateBirdDto } from './dto/create-bird.dto';
import { UpdateBirdDto } from './dto/update-bird.dto';


@Injectable()
export class BirdsService {
  constructor(@InjectModel(Bird.name) private birdModel: Model<BirdDocument>) {}

  async create(createBirdDto: CreateBirdDto): Promise<Bird> {
    const createdBird = new this.birdModel(createBirdDto);
    return createdBird.save();
  }

  async findAll(search?: string): Promise<Bird[]> {
    if (search) {
      return this.birdModel.find({ name: { $regex: search, $options: 'i' } }).exec();
    }
    return this.birdModel.find().exec();
  }

  async findOne(id: string): Promise<Bird> {
    const bird = await this.birdModel.findOne({ _id: id }).exec();
    if (!bird) {
      throw new NotFoundException(`Bird with ID ${id} not found`);
    }
    return bird;
  }

  async update(id: string, updateBirdDto: UpdateBirdDto): Promise<Bird> {
    const updatedBird = await this.birdModel.findOneAndUpdate({ _id: id }, updateBirdDto, { new: true }).exec();
    if (!updatedBird) {
      throw new NotFoundException(`Bird with ID ${id} not found`);
    }
    return updatedBird;
  }

  async remove(id: string): Promise<void> {
    console.log(`Attempting to delete bird with id: ${id}`);
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid ID');
    }

    const objectId = new Types.ObjectId(id);
    const result = await this.birdModel.deleteOne({ _id: objectId }).exec();
    if (result.deletedCount === 0) {
      console.log(`No bird found with id: ${id}`);
      throw new NotFoundException('Bird not found');
    } else {
      console.log(`Bird deleted with id: ${id}`);
    }
  }

  async populateBirdsFromApi(): Promise<void> {
    try {
      const response = await axios.get('https://freetestapi.com/api/v1/birds');
      const birds = response.data;

      const birdPromises = birds.map((bird: CreateBirdDto) => {
        const createdBird = new this.birdModel(bird);
        return createdBird.save();
      });

      await Promise.all(birdPromises);
    } catch (error) {
      console.error('Error fetching birds from API:', error);
      throw new Error('Failed to fetch and populate birds from API');
    }
  }
}
