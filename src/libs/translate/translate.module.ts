import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AcceptLanguageResolver, I18nJsonLoader, I18nModule, QueryResolver } from 'nestjs-i18n'

import { getTranslateConfig } from '@/config'

import { TranslateService } from './translate.service'

@Module({
	imports: [
		I18nModule.forRootAsync({
			useFactory: (config: ConfigService) => getTranslateConfig(config),
			inject: [ConfigService],
			loader: I18nJsonLoader,
			resolvers: [{ use: QueryResolver, options: ['lang'] }, AcceptLanguageResolver]
		})
	],
	providers: [TranslateService],
	exports: [TranslateService]
})
export class TranslateModule {}
