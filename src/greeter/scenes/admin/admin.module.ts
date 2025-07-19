import { Module } from '@nestjs/common'

import { PrismaModule } from '@/infra/prisma/prisma.module'
import { ExtraModule } from '@/libs/extra/extra.module'
import { SessionModule } from '@/libs/session/session.module'
import { SessionService } from '@/libs/session/session.service'
import { TranslateModule } from '@/libs/translate/translate.module'

import { AdminScene } from './admin.scene'

@Module({
	imports: [ExtraModule, TranslateModule, SessionModule, PrismaModule],
	providers: [AdminScene, SessionService]
})
export class AdminModule {}
