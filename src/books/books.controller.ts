import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    UseGuards,
    Request,
  } from '@nestjs/common';
  import { BooksService } from './books.service';
  import { CreateBookDto, UpdateBookDto } from './dto/book.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  
  @Controller('books')
  export class BooksController {
    constructor(private readonly booksService: BooksService) {}
  
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Request() req, @Body() createBookDto: CreateBookDto) {
      return this.booksService.create(req.user.userId, createBookDto);
    }
  
    @Get()
    findAll() {
      return this.booksService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.booksService.findOne(+id);
    }
  
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Request() req, @Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
      return this.booksService.update(req.user.userId, +id, updateBookDto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Request() req, @Param('id') id: string) {
      return this.booksService.remove(req.user.userId, +id);
    }
  }
  