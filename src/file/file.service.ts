import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FileService {
	constructor(private prismaService: PrismaService) {}

	async create(dto: CreateFileDto) {
		const newFile = await this.prismaService.file.create({
			data: {
				...dto,
			},
		});

		return newFile;
	}
}
