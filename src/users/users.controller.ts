import { Controller, Get, Put, Delete, Param, Body } from "@nestjs/common";
import { UserService } from './users.service';

@Controller()

export class UserController {
    constructor(private userService: UserService ) {}
     @Get(':id') 
     async getUser(@Param('id') id: string) {
        return this.userService.getUserById(id);
     }

     @Put(':id')
     async updateUser(@Param('id') id: string, @Body() body: any) {
        return this.userService.updateUser(id, body);
     }
     @Delete(':id') 
     async deleteUser(@Param('id') id: string, @Body() body: any) {
        return this.userService.deleteUser(id, body);

     }
}