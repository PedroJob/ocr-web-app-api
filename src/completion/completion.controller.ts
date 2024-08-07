import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	Query,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { CompletionService } from './completion.service';
import { TextCompletionDto } from './dto/text.completion.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('completion')
export class CompletionController {
	constructor(private readonly completionService: CompletionService) {}

	@Get('text')
	@UseGuards(JwtGuard)
	@UseInterceptors(ClassSerializerInterceptor)
	async textCompletion(@Body() dto: TextCompletionDto) {
		return await this.completionService.textCompletion(dto);
	}
}
