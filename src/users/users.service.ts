import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Get All Users (Admins Only)
  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        favouriteGenre: true,
        education: true,
        role: true,
        createdAt: true,
      },
    });
  }

  // Get a Single User by ID
  async findOne(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        favouriteGenre: true,
        education: true,
        role: true,
        createdAt: true,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // Update User Profile (User can update only their own profile)
  async update(userId: number, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  // Delete User (Admin or User)
  async remove(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    await this.prisma.user.delete({ where: { id: userId } });
    return { message: 'User deleted successfully' };
  }
}
