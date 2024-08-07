import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
	controllers: [FileController],
	providers: [FileService, PrismaService, JwtService],
})
export class FileModule {}
