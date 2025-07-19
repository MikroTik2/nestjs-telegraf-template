import { Logger } from '@nestjs/common'
import { Start, Update } from 'nestjs-telegraf'

import { IContext } from '@/common/interfaces'

@Update()
export class GreeterUpdate {
	@Start()
	public async start(ctx: IContext) {
		// this.sessionService.resetBotSession(ctx)
		Logger.verbose('Start command received', GreeterUpdate.name)

		await ctx.scene.enter('scenes.home')
	}
}
