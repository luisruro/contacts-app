import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class LoginDto {

    @IsNotEmpty({ message: 'Email is required and must be a valid email address' })
    @IsString()
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email: string;

    @IsNotEmpty({ message: 'Password is required and must be a valid password: at least 8 characters, 1 upper case, at least one digit from (0-9) and at least one special character' })
    @IsString()
    @IsStrongPassword({}, { message: 'Please provide a valid password: at least 8 characters, at least 1 upper case, at least one digit from (0-9) and at least one special character' })
    @Transform(({ value }) => value.trim())
    password: string;
}