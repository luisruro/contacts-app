import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import configurations from './common/config/configurations';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ContactsModule } from './contacts/contacts.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurations],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UsersModule,
    AuthModule,
    ContactsModule,
  ]
})
export class AppModule {}
