import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const EXPIRE_TIME = 20 * 1000;

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto);

		const payload = {
			username: user.email,
			sub: {
				name: user.name,
			},
		};

		const accessToken = await this.jwtService.signAsync(payload, {
			expiresIn: process.env.JWT_TOKEN_EXPIRES,
			secret: process.env.JWT_SECRET,
		});

		const refreshToken = await this.jwtService.signAsync(payload, {
			expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES,
			secret: process.env.JWT_REFRESH_SECRET,
		});

		return {
			user,
			backendTokens: {
				accessToken,
				refreshToken,
				expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
			},
		};
	}

	async validateUser(dto: AuthDto) {
		const { userEmail, userPassword } = dto;

		const user = await this.userService.findByEmail(userEmail);

		if (user && (await compare(userPassword, user.password))) {
			const { password, ...result } = user;
			return result;
		}

		throw new UnauthorizedException('Email or password incorrect');
	}

	async refreshToken(user: any) {
		const payload = {
			username: user.username,
			sub: user.sub,
		};

		const accessToken = await this.jwtService.signAsync(payload, {
			expiresIn: process.env.JWT_TOKEN_EXPIRES,
			secret: process.env.JWT_SECRET,
		});

		const refreshToken = await this.jwtService.signAsync(payload, {
			expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES,
			secret: process.env.JWT_REFRESH_SECRET,
		});

		return {
			accessToken,
			refreshToken,
			expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
		};
	}
}
