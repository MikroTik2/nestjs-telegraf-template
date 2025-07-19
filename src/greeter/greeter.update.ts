import { Logger } from '@nestjs/common'
import { Start, Update } from 'nestjs-telegraf'

import { IContext } from '@/common/interfaces'

@Update()
export class GreeterUpdate {
	@Start()
	public async start(ctx: IContext) {
		Logger.verbose(ctx.session, `🟡 Session started`)

		await ctx.scene.enter('scenes.home')
	}
}
