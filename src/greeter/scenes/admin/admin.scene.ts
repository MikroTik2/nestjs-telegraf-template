import { SceneEnter } from 'nestjs-telegraf'

import { SceneDecorator } from '@/common/decorators'
import { IContext } from '@/common/interfaces'
import { ExtraService } from '@/libs/extra/extra.service'

@SceneDecorator('scenes.admin')
export class AdminScene {
	constructor(private readonly extraService: ExtraService) {}

	@SceneEnter()
	async enter(ctx: IContext) {
		const { extraService } = this
		const { lang } = ctx.session

		await extraService.replyOrEdit(ctx, lang, {
			text: 'phrases.admin'
		})
	}
}
