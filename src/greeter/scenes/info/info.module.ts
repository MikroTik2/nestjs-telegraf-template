import { Module } from '@nestjs/common'

import { ExtraModule } from '@/libs/extra/extra.module'

import { InfoScene } from './info.scene'

@Module({
	imports: [ExtraModule],
	providers: [InfoScene],
	exports: [InfoScene]
})
export class InfoModule {}
