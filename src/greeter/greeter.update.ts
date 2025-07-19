import { Logger } from '@nestjs/common'
import { Start, Update } from 'nestjs-telegraf'

import { IContext } from '@/common/interfaces'
import { SessionService } from '@/libs/session/session.service'

@Update()
export class GreeterUpdate {
	public constructor(private readonly sessionService: SessionService) {}

	@Start()
	public async start(ctx: IContext) {
		this.sessionService.resetBotSession(ctx)
		Logger.verbose(ctx.session, `🟡 Session started`)

		await ctx.scene.enter('scenes.home')
	}
}
