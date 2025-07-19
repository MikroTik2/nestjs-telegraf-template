import { ConfigService } from '@nestjs/config'
import { TelegrafModuleAsyncOptions, TelegrafModuleOptions } from 'nestjs-telegraf'
import { session } from 'telegraf'

const telegrafModuleOptions = (config: ConfigService): TelegrafModuleOptions => {
	return {
		token: config.getOrThrow('TELEGRAM_BOT_TOKEN'),
		middlewares: [session()]
	}
}

export const getTelegramConfig = (): TelegrafModuleAsyncOptions => {
	return {
		botName: 'greeter_bot',
		inject: [ConfigService],
		useFactory: (config: ConfigService) => telegrafModuleOptions(config)
	}
}
