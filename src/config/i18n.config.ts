import { ConfigService } from '@nestjs/config'
import { I18nOptions } from 'nestjs-i18n'
import { join } from 'path'

export const getI18nConfig = (config: ConfigService): I18nOptions => {
	return {
		fallbackLanguage: config.getOrThrow('FALLBACK_LANGUAGE'),
		fallbacks: {
			'en-*': 'en',
			'ru-*': 'ru'
		},
		loaderOptions: {
			path: join(__dirname, 'src/locales'),
			watch: true,
			includeSubfolders: true
		},
		typesOutputPath: join(__dirname, 'src/common/types/translate.types.generated.ts')
	}
}
