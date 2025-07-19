import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { TelegrafArgumentsHost } from 'nestjs-telegraf'

import { IContext } from '@/common/interfaces'

@Catch()
export class TelegrafExceptionFilter implements ExceptionFilter {
	async catch(exception: Error, host: ArgumentsHost): Promise<void> {
		const telegrafHost = TelegrafArgumentsHost.create(host)
		const ctx = telegrafHost.getContext<IContext>()

		await ctx.replyWithHTML(`<b>Error</b>: ${exception.message}`)
	}
}
