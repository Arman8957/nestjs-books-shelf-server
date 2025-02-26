import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginDto } from './dto/auth.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signup(data: any) {
    console.log("Signup service called with data:", data); // Log incoming request

    const { fullName, email, password, role, favouriteGenre } = data;
    
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new BadRequestException('Email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { fullName, email, password: hashedPassword, role, favouriteGenre },
    });

    console.log("User created:", user); //  Log user creation
    return { message: 'User registered successfully', userId: user.id };
  }
  

  async login(data: LoginDto) {
    const { email, password } = data;

    // Find user by email
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    // Validate password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new BadRequestException('Invalid credentials');

    // Generate JWT
    const token = this.jwtService.sign({ userId: user.id, role: user.role });

    return { message: 'Login successful', token };
  }
}
