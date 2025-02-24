import { Injectable, NotFoundException, Post } from '@nestjs/common';

import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class UserService{
    constructor(private prisma: PrismaService) {}
    async getUserById(id: number) {
        const user = await this.prisma.user.findUnique({where:{id}});

        if(!user) throw new NotFoundException("You are not real user");
        return user;
    }

    async updateUser(id: number, data:any) {
        let userId = Number(id);
        if(isNaN(userId)) {
             throw new Error("Your ID wasn't right..")
        }
        return this.prisma.user.update({where: {id: userId}, data})
    }
    async deleteUser(id:number, data: any) {
        return this.prisma.user.delete({where: {id}});
    }
}