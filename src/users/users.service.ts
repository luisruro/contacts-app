import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from "typeorm";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>
    ) { };

    async createUser(createUserDto: CreateUserDto) {

        const userFound = await this.usersRepository.findOne({
            where: {
                email: createUserDto.email
            }
        });

        if (userFound) {
            throw new HttpException('User with the email already exists', HttpStatus.CONFLICT);
        }

        const newUser = this.usersRepository.create(createUserDto);
        console.log('Created user from users.service create method', newUser);

        return await this.usersRepository.save(newUser);
    }

    async getAllUsers() {
        return await this.usersRepository.find({
            relations: ['contacts']
        });
    }

    async getUserById(id: string) {
        const userFound = await this.usersRepository.findOne({
            where: {
                id
            },
            relations: ['contacts']
        });

        if (!userFound) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return userFound;
    }

    async deleteUser(id: string) {
        const result = await this.usersRepository.delete({ id });

        if (result.affected === 0) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return result;
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        const userFound = await this.usersRepository.findOne({
            where: {
                id
            }
        });

        if (!userFound) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return this.usersRepository.update(id, updateUserDto)
    }

    async findUserByEmail(email: string): Promise<User> {
        return await this.usersRepository.findOneBy({ email })
    }

    async findUserByEmailWithPassword(email: string) {
        return await this.usersRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password', 'creationDate'],
        });
    }
}
