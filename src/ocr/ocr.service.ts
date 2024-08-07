import { Injectable } from '@nestjs/common';
import * as Tesseract from 'tesseract.js';
import * as fs from 'fs';

@Injectable()
export class OcrService {
	async extractText(file: Tesseract.ImageLike) {
		const result = await Tesseract.recognize(file, 'eng', {
			logger: (m) => console.log(m),
		})
			.then((res) => res.data)
			.then((data) => data.text.split('\n'))
			.catch((err) => {
				throw new Error(err.message);
			});

		return result;
	}

	// async uploadToS3(filePath: string, fileName: string): Promise<string> {
	// 	const fileContent = fs.readFileSync(filePath);
	// 	const fileKey = `${uuidv4()}-${fileName}`;
	// 	const params = {
	// 		Bucket: this.awsConfigService.s3.config.bucketName,
	// 		Key: fileKey,
	// 		Body: fileContent,
	// 		ACL: 'public-read',
	// 	};

	// 	const data = await this.awsConfigService.s3.upload(params).promise();
	// 	return data.Location;
	// }

	// async cleanUp(filePath: string) {
	// 	fs.unlinkSync(filePath);
	// }
}
