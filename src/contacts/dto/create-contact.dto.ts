import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from "class-validator";

export class CreateContactDto {

    @IsNotEmpty({ message: "Name is required and must be a string" })
    @IsString()
    @MinLength(3)
    name: string;

    @IsNotEmpty({ message: "Name is required and must be a string" })
    @IsString()
    @IsPhoneNumber(undefined, { message: 'Please provide a valid phone number' })
    phone: string;
}