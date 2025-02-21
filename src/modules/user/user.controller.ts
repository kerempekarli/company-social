import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto'; // ✅ Doğru DTO
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) { // ✅ Hata burada düzeltiliyor
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  @Patch(':userId/assign-role')
  assignRole(
    @Param('userId', ParseIntPipe) userId: number,
    @Body('role_id', ParseIntPipe) roleId: number,
  ) {
    return this.userService.assignRole(userId, roleId);
  }

  @Patch(':userId/remove-role')
  removeRole(
    @Param('userId', ParseIntPipe) userId: number,
    @Body('role_id', ParseIntPipe) roleId: number,
  ) {
    return this.userService.removeRole(userId, roleId);
  }
}
