import { SceneEnter } from 'nestjs-telegraf'

import { ActionDecorator, SceneDecorator } from '@/common/decorators'
import { IContext } from '@/common/interfaces'
import { Langs } from '@/common/types'
import { ExtraService } from '@/libs/extra/extra.service'

@SceneDecorator('scenes.language')
export class LanguageScene {
	public constructor(private readonly extraService: ExtraService) {}

	@SceneEnter()
	public async enter(ctx: IContext) {
		const { extraService } = this
		const { lang } = ctx.session

		await extraService.replyOrEdit(ctx, ctx.session.lang, {
			text: 'phrases.language',
			...extraService.typedInlineKeyboard([['languages.en', 'languages.ru'], ['buttons.back']], lang)
		})
	}

	@ActionDecorator(['languages.en', 'languages.ru'])
	public async switchLanguage(ctx: IContext) {
		const langFromCallback: Langs = ctx.callbackQuery.data.split('.')[1] as Langs
		const langFromSession: Langs = ctx.session.lang

		console.log(langFromSession)

		if (ctx.session.lang === langFromCallback) {
			await this.extraService.replyAlert(ctx, langFromSession, {
				text: 'alerts.language_already_exists',
				args: { lang: langFromSession }
			})
			return
		}

		ctx.session.lang = langFromCallback

		await ctx.scene.reenter()
	}

	@ActionDecorator('buttons.back')
	public async back(ctx: IContext) {
		await ctx.scene.enter('scenes.home')
	}
}
