import { Injectable } from '@nestjs/common';
import { OpenAiCompletionResponse } from './models/open.ai.completion.response';
import OpenAi from 'openai';
import { ChatCompletionMessageDto } from './models/open.ai.completion.request';
import { ChatCompletionAssistantMessageParam } from 'openai/resources';

@Injectable()
export class OpenaiService {
	private readonly client: OpenAi;

	private readonly DEFAULT_COMPLETION_MODEL = 'gpt-3.5-turbo';
	private readonly MAX_TOKENS = 128;

	constructor() {
		const config = {
			apiKey: process.env.OPENAI_API_KEY,
		};

		this.client = new OpenAi(config);
	}

	async textCompletion(
		messages: ChatCompletionMessageDto[],
		modelId: string = this.DEFAULT_COMPLETION_MODEL,
		maxTokens: number = this.MAX_TOKENS,
	) {
		return this.client.chat.completions
			.create({
				messages: messages as ChatCompletionAssistantMessageParam[],
				model: modelId,
			})
			.then((response) => response);
	}
}
