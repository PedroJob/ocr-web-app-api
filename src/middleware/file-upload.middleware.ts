// src/middleware/file-upload.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import * as multer from 'multer';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class FileUploadMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const upload = multer({ dest: './uploads' }).single('file');
		upload(req, res, (err: any) => {
			if (err) {
				return res
					.status(400)
					.json({ message: 'File upload failed', error: err.message });
			}
			next();
		});
	}
}
