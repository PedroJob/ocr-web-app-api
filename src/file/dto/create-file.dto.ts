import { IsInt, IsString } from 'class-validator';

export class CreateFileDto {
	// @IsString()
	// filePath: string;

	@IsString()
	fileName: string;

	@IsString()
	extractedText: string;

	@IsInt()
	userId: number;
}
