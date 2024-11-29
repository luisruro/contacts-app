import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Auth()
@Controller('contacts')
export class ContactsController {
    constructor(
        private readonly contactsService: ContactsService
    ) { };

    @Post('new/:userId')
    async createContact(@Param('userId') userId: string, @Body() createContact: CreateContactDto) {
        return await this.contactsService.createContact(userId, createContact);
    }

    @Get()
    async getAllContacts() {
        return await this.contactsService.getAllContacts();
    }

    @Get(':id')
    async getContactById(@Param('id', ParseUUIDPipe) id: string) {
        return await this.contactsService.getContactById(id);
    }

    @Delete(':id')
    async deleteContact(@Param('id', ParseUUIDPipe) id: string) {
        return await this.contactsService.deleteContact(id);
     }

    @Patch()
    async updateContact(@Body() updateContactDto: UpdateContactDto, @Param('id', ParseUUIDPipe) id: string) {
        return await this.contactsService.updateContact(id, updateContactDto);
    }
}
