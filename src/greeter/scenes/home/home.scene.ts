import { SceneEnter } from 'nestjs-telegraf'

import { ActionDecorator, SceneDecorator } from '@/common/decorators'
import { IContext } from '@/common/interfaces'
import { ExtraService } from '@/libs/extra/extra.service'

@SceneDecorator('scenes.home')
export class HomeScene {
	public constructor(private readonly extraService: ExtraService) {}

	@SceneEnter()
	public async start(ctx: IContext) {
		const { extraService } = this
		const { lang } = ctx.session

		await extraService.replyOrEdit(ctx, lang, {
			text: 'phrases.home',
			args: { username: `<b>${ctx.from.username}</b>` },
			...extraService.typedInlineKeyboard([['buttons.faq', 'buttons.change_language']], lang)
		})
	}

	@ActionDecorator('buttons.admin.home')
	public async toAdminPanel(ctx: IContext) {
		await ctx.scene.enter('scenes.admin')
	}

	@ActionDecorator('buttons.faq')
	public async faq(ctx: IContext) {
		await ctx.scene.enter('scenes.faq')
	}

	@ActionDecorator('buttons.change_language')
	public async changeLanguage(ctx: IContext) {
		await ctx.scene.enter('scenes.language')
	}
}
