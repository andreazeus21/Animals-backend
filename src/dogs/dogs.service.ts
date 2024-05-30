import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import axios from 'axios';
import { Dog, DogDocument } from './schemas/dog.schema';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

@Injectable()
export class DogsService {
  constructor(@InjectModel(Dog.name) private dogModel: Model<DogDocument>) {}

  async create(createDogDto: CreateDogDto): Promise<Dog> {
    const createdDog = new this.dogModel(createDogDto);
    return createdDog.save();
  }

  async findAll(search?: string): Promise<Dog[]> {
    if (search) {
      return this.dogModel.find({name: {$regex: search}}).exec();
    }
    return this.dogModel.find().exec();
  }

  async findOne(id: string): Promise<Dog> {
    const dog = await this.dogModel.findOne({ _id: id }).exec();
    if (!dog) {
      throw new NotFoundException(`Dog with ID ${id} not found`);
    }
    return dog;
  }

  async update(id: string, updateDogDto: UpdateDogDto): Promise<Dog> {
    const updatedDog = await this.dogModel.findOneAndUpdate({ _id: id }, updateDogDto, { new: true }).exec();
    if (!updatedDog) {
      throw new NotFoundException(`Dog with ID ${id} not found`);
    }
    return updatedDog;
  }

  async remove(id: string): Promise<void> {
    console.log(`Attempting to delete dog with id: ${id}`);
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid ID');
    }

    const objectId = new Types.ObjectId(id);
    const result = await this.dogModel.deleteOne({ _id: objectId }).exec();
    if (result.deletedCount === 0) {
      console.log(`No dog found with id: ${id}`);
      throw new NotFoundException('Dog not found');
    } else {
      console.log(`Dog deleted with id: ${id}`);
    }
  }

  async populateDogsFromApi(): Promise<void> {
    try {
      const response = await axios.get('https://freetestapi.com/api/v1/dogs');
      const dogs = response.data;

      const dogPromises = dogs.map((dog: CreateDogDto) => {
        const createdDog = new this.dogModel(dog);
        return createdDog.save();
      });

      await Promise.all(dogPromises);
    } catch (error) {
      console.error('Error fetching dogs from API:', error);
      throw new Error('Failed to fetch and populate dogs from API');
    }
  }
}
