import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TelegrafModule } from 'nestjs-telegraf'

import { options } from '@/config'
import { GreeterModule } from '@/greeter/greeter.module'
import { InfraModule } from '@/infra/infra.module'

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), TelegrafModule.forRootAsync(options()), InfraModule, GreeterModule]
})
export class AppModule {}
