import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from "typeorm";
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ContactsService {
    constructor(
        @InjectRepository(Contact) private readonly contactsRepository: Repository<Contact>,
        private readonly usersService: UsersService
    ) { };

    async createContact(userId: string, createContactDto: CreateContactDto) {

        const user = await this.usersService.getUserById(userId)

        if (!user) {
            throw new HttpException(`User not found with id ${userId}`, HttpStatus.NOT_FOUND);
        }

        const contactFound = await this.contactsRepository.findOne({
            where: {
                phone: createContactDto.phone
            }
        });

        if (contactFound) {
            throw new HttpException(`Contact with phone number ${contactFound.phone} already exists`, HttpStatus.CONFLICT);
        }

        const newContact = this.contactsRepository.create({
            ...createContactDto,
            user
        });
        console.log('Created contact from contacts.service create method', newContact);

        return await this.contactsRepository.save(newContact);
    }

    async getAllContacts() {
        return await this.contactsRepository.find();
    }

    async getContactById(id: string) {
        const contactFound = await this.contactsRepository.findOne({
            where: {
                id
            }
        });

        if (!contactFound) {
            throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
        }

        return contactFound;
    }

    async deleteContact(id: string) {
        const result = await this.contactsRepository.delete({ id });

        if (result.affected === 0) {
            throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
        }

        return result;
    }

    async updateContact(id: string, updateContactDto: UpdateContactDto) {
        const contactFound = await this.contactsRepository.findOne({ 
            where: {
                id
            }
         });

         if (!contactFound) {
            throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
         }

         return this.contactsRepository.update(id, updateContactDto)
    }
}
