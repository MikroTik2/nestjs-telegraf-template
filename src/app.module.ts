import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TelegrafModule } from 'nestjs-telegraf'

import { getTelegramConfig } from '@/config'
import { GreeterModule } from '@/greeter/greeter.module'
import { InfraModule } from '@/infra/infra.module'

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), TelegrafModule.forRootAsync(getTelegramConfig()), InfraModule, GreeterModule]
})
export class AppModule {}
