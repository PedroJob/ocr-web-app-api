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
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/file/file.service';
import { CreateFileDto } from 'src/file/dto/create-file.dto';

@Controller('ocr')
export class OcrController {
	constructor(
		private readonly ocrService: OcrService,
		private readonly fileService: FileService,
	) {}

	@UseGuards(JwtGuard)
	@Post('upload')
	@UseInterceptors(FileInterceptor('file'))
	async uploadFile(
		@UploadedFile()
		file: Express.Multer.File,
		@Request() req,
		@Response() res,
	) {
		try {
			const extractedText = await this.ocrService
				.extractText(file.buffer)
				.then((text) => text.join(''));
			// const fileUrl = await this.ocrService.uploadToS3(file.path, file.originalname);

			const newFile: CreateFileDto = {
				userId: +req.body.userId,
				fileName: file.originalname,
				extractedText,
			};
			const result = await this.fileService.create(newFile);

			// this.ocrService.cleanUp(file);

			return res.status(201).json({
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
