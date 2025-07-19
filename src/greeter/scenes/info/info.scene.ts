import { SceneEnter } from 'nestjs-telegraf'

import { ActionDecorator, SceneDecorator } from '@/common/decorators'
import { IContext } from '@/common/interfaces'
import { ExtraService } from '@/libs/extra/extra.service'

@SceneDecorator('scenes.faq')
export class InfoScene {
	public constructor(private readonly extraService: ExtraService) {}

	@SceneEnter()
	public async enter(ctx: IContext) {
		const { extraService } = this
		const { lang } = ctx.session

		await extraService.replyOrEdit(ctx, ctx.session.lang, {
			text: 'phrases.faq',
			...extraService.typedInlineKeyboard([['buttons.back']], lang)
		})
	}

	@ActionDecorator('buttons.back')
	public async back(ctx: IContext) {
		await ctx.scene.enter('scenes.home')
	}
}
