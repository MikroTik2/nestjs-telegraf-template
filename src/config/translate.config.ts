import { ConfigService } from '@nestjs/config'
import { I18nOptions } from 'nestjs-i18n'
import { join } from 'path'

export const getTranslateConfig = (config: ConfigService): I18nOptions => {
	return {
		fallbackLanguage: config.getOrThrow('FALLBACK_LANGUAGE'),
		fallbacks: {
			'en-*': 'en',
			'ru-*': 'ru'
		},
		loaderOptions: {
			path: join(process.cwd(), 'src/locales'),
			watch: true,
			includeSubfolders: true
		},
		typesOutputPath: join(process.cwd(), 'src/common/types/translate.types.generated.ts')
	}
}
