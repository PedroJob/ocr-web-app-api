import { Injectable } from '@nestjs/common';
import { OpenaiService } from '../openai/openai.service';
import { TextCompletionDto } from './dto/text.completion.dto';

@Injectable()
export class CompletionService {
	constructor(private readonly openAiService: OpenaiService) {}

	async textCompletion(dto: TextCompletionDto) {
		return await this.openAiService.textCompletion(dto.prompt);
	}
}
