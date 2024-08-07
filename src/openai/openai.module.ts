import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Module({
	controllers: [],
	providers: [OpenaiService],
})
export class OpenaiModule {}
