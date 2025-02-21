import { Injectable, NotFoundException, Post } from '@nestjs/common';

import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class UserService{
    constructor(private prisma: PrismaService) {}
    async getUserById(id: string) {
        const user = await this.prisma.user.findUnique({where:{id}});

        if(!user) throw new NotFoundException("You are not real user");
        return user;
    }

    async updateUser(id: string, data:any) {
        return this.prisma.user.update({where: {id}, data})
    }
    async deleteUser(id:string, data: any) {
        return this.prisma.user.delete({where: {id}});
    }
}