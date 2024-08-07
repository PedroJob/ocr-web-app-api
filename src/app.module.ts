import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { OcrModule } from './ocr/ocr.module';
import { FileModule } from './file/file.module';
import { OpenaiModule } from './openai/openai.module';
import { CompletionModule } from './completion/completion.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		UserModule,
		AuthModule,
		OcrModule,
		FileModule,
		OpenaiModule,
		CompletionModule,
	],
	controllers: [AppController],
	providers: [AppService, PrismaService],
})
export class AppModule {}
