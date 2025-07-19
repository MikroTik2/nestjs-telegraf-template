import { Injectable } from '@nestjs/common'
import { Message } from 'telegraf/typings/core/types/typegram'

import { IContext } from '@/common/interfaces'

@Injectable()
export class SessionService {
	public resetBotSession(ctx: IContext): void {
		this.resetImage(ctx).resetPropsOnCreate(ctx)
	}

	public setLastMessageId({ session }: IContext, msg: Message) {
		session.messageId = msg.message_id
		return this
	}

	public setImage({ session }: IContext, url: URL) {
		session.image = url.toString()
		return this
	}

	public resetImage({ session }: IContext): this {
		session.image = ''
		return this
	}

	public resetPropsOnCreate({ session }: IContext): this {
		session.creation = {}
		return this
	}
}
