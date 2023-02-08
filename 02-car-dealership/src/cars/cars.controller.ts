import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Patch, Post, UsePipes } from '@nestjs/common/decorators';
import { ParseIntPipe, ParseUUIDPipe, ValidationPipe } from '@nestjs/common/pipes';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
@UsePipes(ValidationPipe)
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
        return createCarDto;
    }

    @Patch(':id')
    updateCar( 
        @Param('id', ParseIntPipe) id: number,
        @Body() body: any
    ) {
        return {id, ...body};
    }

    @Delete(':id')
    deleteCar( @Param('id', ParseIntPipe) id: number) {
        return {
            method: 'delete',
            id
        };
    }
}
