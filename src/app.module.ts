import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TelegrafModule } from 'nestjs-telegraf'

import { getTelegramConfig } from '@/config'
import { GreeterModule } from '@/greeter/greeter.module'
import { GreeterUpdate } from '@/greeter/greeter.update'
import { HomeModule } from '@/greeter/scenes/home/home.module'
import { InfoModule } from '@/greeter/scenes/info/info.module'
import { InfraModule } from '@/infra/infra.module'
import { SessionService } from '@/libs/session/session.service'

import { LanguageModule } from './greeter/scenes/language/language.module'

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), TelegrafModule.forRootAsync(getTelegramConfig()), InfraModule, GreeterModule, HomeModule, InfoModule, LanguageModule],
	providers: [GreeterUpdate, SessionService]
})
export class AppModule {}
