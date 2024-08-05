import { IsString } from 'class-validator';

export class FileDto {
	@IsString()
	filePath: string;

	@IsString()
	fileName: string;

	@IsString()
	extractedText: string;
}
