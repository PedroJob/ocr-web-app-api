import { IsArray, IsString } from 'class-validator';
import { ChatCompletionMessageDto } from 'src/openai/models/open.ai.completion.request';

export class TextCompletionDto {
	@IsArray()
	prompt: ChatCompletionMessageDto[];
}
