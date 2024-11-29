import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';


@Module({
  providers: [ContactsService],
  controllers: [ContactsController],
  imports: [TypeOrmModule.forFeature([Contact, User]), UsersModule]
})
export class ContactsModule {}
