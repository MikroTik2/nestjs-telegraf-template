import { ConfigService } from '@nestjs/config'
import { TelegrafModuleAsyncOptions, TelegrafModuleOptions } from 'nestjs-telegraf'

const telegrafModuleOptions = (config: ConfigService): TelegrafModuleOptions => {
	return {
		token: config.getOrThrow('TELEGRAM_BOT_TOKEN')
	}
}

export const getTelegramConfig = (): TelegrafModuleAsyncOptions => {
	return {
		botName: 'greeter_bot',
		inject: [ConfigService],
		useFactory: (config: ConfigService) => telegrafModuleOptions(config)
	}
}
