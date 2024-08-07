import { OpenAiUsage } from './open.ai.usage';
import { OpenAiChoice } from './open.ai.choice';

export class OpenAiCompletionResponse {
	id: string;
	object: string;
	created: number;
	model: string;
	choices: OpenAiChoice[];
	usage?: OpenAiUsage;
}
