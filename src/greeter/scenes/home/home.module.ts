import { Module } from '@nestjs/common'

import { ExtraModule } from '@/libs/extra/extra.module'
import { TranslateModule } from '@/libs/translate/translate.module'

import { HomeScene } from './home.scene'

@Module({
	imports: [ExtraModule, TranslateModule],
	providers: [HomeScene],
	exports: [HomeScene]
})
export class HomeModule {}
