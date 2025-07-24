import { Module } from '@nestjs/common'

import { ExtraModule } from '@/libs/extra/extra.module'

import { FeedbackWizard } from './feedback.wizard'

@Module({
	imports: [ExtraModule],
	providers: [FeedbackWizard],
	exports: [FeedbackWizard]
})
export class FeedbackModule {}
