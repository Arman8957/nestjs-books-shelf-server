import { Injectable, ForbiddenException } from '@nestjs/common';

import { CreateBookDto, UpdateBookDto } from './dto/book.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, data: CreateBookDto) {
    return this.prisma.postEBook.create({
      data: { ...data, authorId: userId },
    });
  }

  async findAll() {
    return this.prisma.postEBook.findMany({
      include: { author: true, categories: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.postEBook.findUnique({ where: { id } });
  }

  async update(userId: number, id: number, data: UpdateBookDto) {
    const book = await this.prisma.postEBook.findUnique({ where: { id } });

    if (!book || book.authorId !== userId) {
      throw new ForbiddenException('Unauthorized to update this book');
    }

    return this.prisma.postEBook.update({ where: { id }, data });
  }

  async remove(userId: number, id: number) {
    const book = await this.prisma.postEBook.findUnique({ where: { id } });

    if (!book || book.authorId !== userId) {
      throw new ForbiddenException('Unauthorized to delete this book');
    }

    return this.prisma.postEBook.delete({ where: { id } });
  }
}
