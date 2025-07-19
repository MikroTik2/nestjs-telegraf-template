import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram'

import { I18nPath } from '@/common/types'

export interface IReplyOrEditOptions {
	text: I18nPath
	args?: any
	reply_markup?: InlineKeyboardMarkup
}
