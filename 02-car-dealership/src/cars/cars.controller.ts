import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Patch, Post, UsePipes } from '@nestjs/common/decorators';
import { ParseIntPipe, ParseUUIDPipe, ValidationPipe } from '@nestjs/common/pipes';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
/* @UsePipes(ValidationPipe) */
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ){}

    @Get('/')
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarById(@Param('id', ParseUUIDPipe) id: string) {
        console.log({id});
        return this.carsService.findOneById(id);
    }

    @Post()    
    createCar( @Body() createCarDto: CreateCarDto) {
        return this.carsService.create(createCarDto);        
    }

    @Patch(':id')
    updateCar( 
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCar: UpdateCarDto
    ) {
        return this.carsService.update(id, updateCar);
    }

    @Delete(':id')
    deleteCar( @Param('id', ParseUUIDPipe) id: string) {
        return this.carsService.delete(id);
    }
}
