import { IsEmail, IsString } from 'class-validator';

export class AuthDto {
	@IsString()
	@IsEmail()
	userEmail: string;

	@IsString()
	userPassword: string;
}
