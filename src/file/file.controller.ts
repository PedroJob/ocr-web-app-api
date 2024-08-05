import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Req,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';

@Controller('file')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Post('create')
	create(@Body() dto: CreateFileDto, @Req() req) {
		return this.fileService.create(dto);
	}
}
