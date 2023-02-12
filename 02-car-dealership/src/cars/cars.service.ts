import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';
import { Car } from './interfaces/car.interface';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ];

  findAll(): Car[] {
    return this.cars;
  }

  findOneById(id: string): Car {
    const car = this.cars.find((car) => car.id === id);

    if (!car) {
      throw new NotFoundException(`Car with id '${id}' not found`);
    }

    return car;
  }

  create(createCarDto: CreateCarDto): Car {
    const newCar: Car = { id: uuid(), ...createCarDto };
    this.cars = [...this.cars, newCar];
    return newCar;
  }

  update(id: string, updateCar: UpdateCarDto): Car {
    let carDB = this.findOneById(id);

    if (updateCar.id && updateCar.id !== id) {
      throw new BadRequestException(`Car id is not valid inside body`);
    }

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = {
          ...carDB,
          ...updateCar,
          id,
        };
        return carDB;
      }
      return car;
    });
    return carDB;
  }

  delete(id: string): string {
    this.findOneById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
    return id;
  }
}
