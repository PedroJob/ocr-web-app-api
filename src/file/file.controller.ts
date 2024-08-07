import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Req,
	Query,
	UseGuards,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('file')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Post('create')
	@UseGuards(JwtGuard)
	create(@Body() dto: CreateFileDto, @Req() req) {
		return this.fileService.create(dto);
	}

	@Get(':id')
	@UseGuards(JwtGuard)
	getById(@Param('id') id: string) {
		return this.fileService.getById(+id);
	}

	@Get('/')
	@UseGuards(JwtGuard)
	getMyFiles(@Query('userId') userId: string) {
		return this.fileService.getMyFiles(+userId);
	}
}
