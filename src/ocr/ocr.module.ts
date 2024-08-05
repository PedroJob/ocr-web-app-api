import { Module } from '@nestjs/common';
import { OcrService } from './ocr.service';
import { OcrController } from './ocr.controller';
import { FileService } from 'src/file/file.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
	controllers: [OcrController],
	providers: [OcrService, FileService, PrismaService, JwtService],
})
export class OcrModule {}
