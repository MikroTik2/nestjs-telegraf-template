import { Ctx, Message, On, WizardStep } from 'nestjs-telegraf'
import { Scenes } from 'telegraf'

import { WizardDecorator } from '@/common/decorators'
import { IContext } from '@/common/interfaces'
import { IMessage } from '@/common/interfaces/message.interface'
import { ExtraService } from '@/libs/extra/extra.service'

@WizardDecorator('wizard.feedback')
export class FeedbackWizard {
	public constructor(private readonly extraService: ExtraService) {}

	@WizardStep(1)
	public async onSceneEnter(@Ctx() ctx: IContext) {
		ctx.wizard.next()

		const { extraService } = this
		const { lang } = ctx.session

		await extraService.replyOrEdit(ctx, lang, {
			text: 'phrases.feedback'
		})
	}

	@On('text')
	@WizardStep(2)
	public async onFeedback(@Ctx() ctx: IContext, @Message() message: IMessage) {
		const { extraService } = this
		const { lang } = ctx.session

		await extraService.replyOrEdit(ctx, lang, {
			text: 'phrases.feedback_success',
			args: { feedback: `<b>${message.text}</b>` }
		})

		await ctx.scene.leave()
	}
}
