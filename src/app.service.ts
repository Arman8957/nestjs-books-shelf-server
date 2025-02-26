// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class AppService {
//   getHello(): string {
//     return 'Hello World!';
//   }
// }


import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';


@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Welcome to the Library Management System!';
  }

  async getTotalUsers(): Promise<number> {
    return this.prisma.user.count(); // Counts all registered users
  }
}
