import { Module } from '@nestjs/common'

import { ExtraModule } from '@/libs/extra/extra.module'
import { TranslateModule } from '@/libs/translate/translate.module'

import { LanguageScene } from './language.scene'

@Module({
	imports: [ExtraModule, TranslateModule],
	providers: [LanguageScene],
	exports: [LanguageScene]
})
export class LanguageModule {}
