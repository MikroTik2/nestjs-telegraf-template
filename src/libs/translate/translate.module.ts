import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AcceptLanguageResolver, I18nJsonLoader, I18nModule, QueryResolver } from 'nestjs-i18n'

import { getI18nConfig } from '@/config'

@Module({
	imports: [
		I18nModule.forRootAsync({
			useFactory: (config: ConfigService) => getI18nConfig(config),
			inject: [ConfigService],
			loader: I18nJsonLoader,
			resolvers: [{ use: QueryResolver, options: ['lang'] }, AcceptLanguageResolver]
		})
	],
	providers: [],
	exports: []
})
export class TranslateModule {}
