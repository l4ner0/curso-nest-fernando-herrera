import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ){}

    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarById(@Param('id', ParseIntPipe) id: number) {
        console.log({id});
        return this.carsService.findOneById(+id);
    }

    @Post()
    createCar( @Body() body: any) {
        return body;
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
