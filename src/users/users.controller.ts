import { Controller, Get, Param, Delete, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //  Get All Users (Admins Only)
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  // Get User by ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  // Update User Profile (Only logged-in user can update their own data)
  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user['userId']; // Extract user ID from token
    return this.usersService.update(userId, updateUserDto);
  }

  // Delete User Account (Only the user or admin can delete)
  @UseGuards(JwtAuthGuard)
  @Delete()
  async remove(@Req() req: Request) {
    const userId = req.user['userId']; // Extract user ID from token
    return this.usersService.remove(userId);
  }
}
