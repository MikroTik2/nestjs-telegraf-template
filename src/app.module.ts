import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TelegrafModule } from 'nestjs-telegraf'

import { getTelegramConfig } from '@/config'
import { GreeterModule } from '@/greeter/greeter.module'
import { GreeterUpdate } from '@/greeter/greeter.update'
import { AdminModule } from '@/greeter/scenes/admin/admin.module'
import { HomeModule } from '@/greeter/scenes/home/home.module'
import { InfoModule } from '@/greeter/scenes/info/info.module'
import { LanguageModule } from '@/greeter/scenes/language/language.module'
import { InfraModule } from '@/infra/infra.module'
import { SessionService } from '@/libs/session/session.service'

import { FeedbackModule } from './greeter/wizard/feedback/feedback.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TelegrafModule.forRootAsync(getTelegramConfig()),
		InfraModule,
		GreeterModule,
		HomeModule,
		InfoModule,
		FeedbackModule,
		LanguageModule,
		AdminModule
	],
	providers: [GreeterUpdate, SessionService]
})
export class AppModule {}
