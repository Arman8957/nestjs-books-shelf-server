import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signup(data: any) {
    
    const { fullName, phoneNumber, password, favouriteGenre, profileImage, education, referredBy } = data;

    const existingUser = await this.prisma.user.findFirst({ where: { phoneNumber } });
    if (existingUser) throw new BadRequestException('Phone number already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { fullName, phoneNumber, password: hashedPassword, favouriteGenre, profileImage, education, referredBy },
    });

    return { message: 'User registered successfully', userId: user.id };
  }

  async login(data: any) {
    const { phoneNumber, password } = data;

    const user = await this.prisma.user.findFirst({ where: { phoneNumber } });
    if (!user) throw new NotFoundException('User not found');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new BadRequestException('Invalid credentials');

    const token = this.jwtService.sign({ userId: user.id });
    return { message: 'Login successful', token };
  }
}
