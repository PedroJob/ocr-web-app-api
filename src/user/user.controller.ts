import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('user')
export class UserController {
	constructor(private UserService: UserService) {}

	@UseGuards(JwtGuard)
	@Get(':id')
	async getById(@Param('id') id: number) {
		return await this.UserService.findById(id);
	}
}
