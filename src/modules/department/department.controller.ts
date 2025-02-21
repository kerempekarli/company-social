import { Controller, Get, Post, Patch, Delete, Param, ParseIntPipe, Body } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('department')
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService) { }

    @Get()
    findAll() {
        return this.departmentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.departmentService.findOne(id);
    }

    @Post()
    create(@Body() createDepartmentDto: CreateDepartmentDto) {
        return this.departmentService.create(createDepartmentDto);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateDepartmentDto: UpdateDepartmentDto) {
        return this.departmentService.update(id, updateDepartmentDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.departmentService.remove(id);
    }
}
