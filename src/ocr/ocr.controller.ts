import {
	Controller,
	Post,
	Request,
	Response,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { OcrService } from './ocr.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PrismaService } from '../prisma.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/file/file.service';

@Controller('ocr')
export class OcrController {
	constructor(
		private readonly ocrService: OcrService,
		private readonly fileService: FileService,
	) {}

	@UseGuards(JwtGuard)
	@Post('upload')
	@UseInterceptors(FileInterceptor('file'))
	async uploadFile(@UploadedFile() file, @Request() req, @Response() res) {
		try {
			const extractedText = await this.ocrService
				.extractText(file.path)
				.then((text) => text.join(''));
			// const fileUrl = await this.ocrService.uploadToS3(file.path, file.originalname);

			const newFile = {
				userId: req.user.id,
				fileName: file.originalname,
				filePath: file.path,
				extractedText,
			};
			const result = await this.fileService.create(newFile);

			this.ocrService.cleanUp(file.path);

			return res
				.status(201)
				.json({
					message: 'File uploaded and text extracted successfully',
					result,
				});
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Failed to process the file', error: error.message });
		}
	}
}
