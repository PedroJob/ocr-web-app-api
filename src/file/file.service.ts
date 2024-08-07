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

	async getById(id: number) {
		const file = await this.prismaService.file.findUnique({
			where: { id: id },
		});
		return file;
	}

	getMyFiles(userId: number) {
		return this.prismaService.file.findMany({
			where: { userId },
		});
	}
}
