import { Injectable } from '@nestjs/common'
import { Input } from 'telegraf'
import { Message } from 'telegraf/typings/core/types/typegram'
import { Buttons, CallbackButton, Key, Keyboard, MakeOptions } from 'telegram-keyboard'

import { IButton, IContext, IReplyAlertOptions, IReplyOrEditOptions, IReplyOrEditWithPhotoOptions } from '@/common/interfaces'
import { ButtonsStack, I18nPath, Langs } from '@/common/types'
import { SessionService } from '@/libs/session/session.service'
import { TranslateService } from '@/libs/translate/translate.service'

@Injectable()
export class ExtraService {
	public constructor(
		private readonly sessionService: SessionService,
		private readonly translateService: TranslateService
	) {}

	public async tryDeleteMessage(ctx: IContext) {
		try {
			const { messageId } = ctx.session
			await ctx.deleteMessage(messageId ? messageId : undefined)
		} catch (error) {
			console.error('Failed to delete message:', error)
		}
	}

	// Избавляемся от спана сообщений, путем изменения прощлого текстового сообщения
	public async replyOrEdit(ctx: IContext, lang: Langs, options: IReplyOrEditOptions) {
		const { reply_markup } = options
		const phrase = this.translateService.findPhrase(options.text, lang, options.args)

		try {
			return (await ctx.editMessageText(phrase, {
				reply_markup,
				parse_mode: 'HTML'
			})) as Message.TextMessage
		} catch (e) {
			return await ctx.sendMessage(phrase, { reply_markup, parse_mode: 'HTML' })
		}
	}

	public async replyOrEditWithPhoto(ctx: IContext, lang: Langs, options: IReplyOrEditWithPhotoOptions) {
		const { reply_markup } = options
		const phrase = this.translateService.findPhrase(options.text, options.args)

		return await ctx.sendPhoto(Input.fromURLStream(options.image), {
			caption: phrase,
			reply_markup,
			parse_mode: 'HTML',
			...reply_markup
		})
	}

	// Вывод уведомления на экран клиента
	public async replyAlert(ctx: IContext, lang: Langs, { text, args }: IReplyAlertOptions): Promise<void> {
		const translatedText = this.translateService.findPhrase(text, lang, args)
		await ctx.answerCbQuery(translatedText)
	}

	// Сохраняем изображение в сессию
	public async saveImage(ctx: IContext) {
		const { file_id } = ctx.update.message.photo.pop()

		const url = await ctx.telegram.getFileLink(file_id)
		this.sessionService.setImage(ctx, url)
	}

	public typedInlineKeyboard(buttons: ButtonsStack, lang: Langs, makeOptions?: Partial<MakeOptions>) {
		return this.typedKeyboard(buttons, lang, makeOptions).inline()
	}

	// Создание типизированной клавиатуры
	public typedKeyboard(buttons: ButtonsStack, lang: Langs, makeOptions?: Partial<MakeOptions>) {
		const parsedButtons = this.toTypedKeyboard(buttons, lang, makeOptions as MakeOptions)
		return Keyboard.make(parsedButtons as CallbackButton[], makeOptions as MakeOptions)
	}

	public simpleInlineKeyboard(buttons: Buttons, template?: string, makeOptions?: Partial<MakeOptions>) {
		return this.simpleKeyboard(buttons, template, makeOptions).inline()
	}

	public simpleKeyboard(buttons: Buttons, template?: string, makeOptions?: Partial<MakeOptions>) {
		if (template) {
			const buttonsFromFactory = this.factoryCallbackData(buttons, template)
			return Keyboard.make(buttonsFromFactory, makeOptions as MakeOptions)
		}
		return Keyboard.make(buttons, makeOptions as MakeOptions)
	}

	public combineKeyboard(...keyboards: Keyboard[]) {
		return Keyboard.combine(...keyboards)
	}

	public removeKeyboard() {
		return Keyboard.remove()
	}

	// Складывает template + callback_button
	//   Нужно чтобы динамически ловить текст кнопок, которые пришли из DB
	//   Например, для получения имен товаров (пришли с БД, добавим шаблон к строке, чтобы потом точно определить к чему это относится)
	private factoryCallbackData(buttons: Buttons, template?: string) {
		return buttons.map((button: any) => {
			if (typeof button == 'string') {
				return Key.callback(button, template + button)
			}

			if (Array.isArray(button)) {
				return button.map(button => Key.callback(button, template + button))
			}
		}) as CallbackButton[]
	}

	private toTypedKeyboard(buttons: ButtonsStack, lang: Langs, _makeOptions?: Partial<MakeOptions>) {
		return buttons.map((buttons: I18nPath | I18nPath[] | IButton | IButton[]) => {
			if (typeof buttons == 'string') {
				return this.toCallbackButton({ text: buttons }, lang)
			}

			if (Array.isArray(buttons)) {
				return buttons
					.map((button: string | IButton) => (typeof button == 'string' ? this.toCallbackButton({ text: button as I18nPath }, lang) : button))
					.map(button => this.toCallbackButton(button as IButton, lang))
			}

			if (typeof buttons == 'object') {
				return this.toCallbackButton(buttons, lang)
			}
		})
	}

	// Преобразование кнопки в CallbackButton
	private toCallbackButton(button: IButton, lang: Langs): CallbackButton {
		const translatedText = this.translateService.findPhrase(button.text, lang, button.args)

		return {
			text: translatedText,
			callback_data: button.callback_data ? button.callback_data : button.text,
			hide: button.hide ? button.hide : false
		}
	}
}
