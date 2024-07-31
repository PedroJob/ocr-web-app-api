import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
	constructor(
		private userService: UserService,
		private authService: AuthService,
	) {}

	@Post('register')
	async registerUser(@Body() dto: CreateUserDto) {
		return this.userService.create(dto);
	}

	@Post('login')
	async login(@Body() dto: AuthDto) {
		return this.authService.login(dto);
	}

	@UseGuards(RefreshGuard)
	@Post('refresh')
	async refreshToken(@Request() req) {
		return await this.authService.refreshToken(req.user);
	}
}
