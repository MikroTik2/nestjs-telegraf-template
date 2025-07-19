import { Module } from '@nestjs/common'

import { SessionModule } from '@/libs/session/session.module'
import { TranslateModule } from '@/libs/translate/translate.module'

import { ExtraService } from './extra.service'

@Module({
	imports: [TranslateModule, SessionModule],
	providers: [ExtraService],
	exports: [ExtraService]
})
export class ExtraModule {}
