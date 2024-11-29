import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { };

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.createUser(createUserDto)
    };

    @Get()
    async getAllUsers() {
        return await this.usersService.getAllUsers();
    }

    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return await this.usersService.getUserById(id);
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        return await this.usersService.deleteUser(id);
    }

    @Patch()
    async updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id', ParseUUIDPipe) id: string) {
        return await this.usersService.updateUser(id, updateUserDto);
    }
}
