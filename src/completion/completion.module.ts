import { Module } from '@nestjs/common';
import { CompletionService } from './completion.service';
import { CompletionController } from './completion.controller';
import { OpenaiService } from 'src/openai/openai.service';
import { JwtService } from '@nestjs/jwt';

@Module({
	controllers: [CompletionController],
	providers: [CompletionService, OpenaiService, JwtService],
})
export class CompletionModule {}
