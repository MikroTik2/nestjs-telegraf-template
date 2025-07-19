import { Action } from 'nestjs-telegraf'

import { I18nPath } from '@/common/types'

/**
 * Декоратор для обработки действий (callback_data) в nestjs-telegraf.
 * Используется для пометки метода как обработчика определённых callback_data.
 * @param callback_data - строка или массив строк (I18nPath), которые будут обрабатываться
 * @returns MethodDecorator
 */
export function ActionDecorator(callback_data: I18nPath | I18nPath[]): MethodDecorator {
	// Приведение к массиву строк для Action
	return Action(callback_data as string[])
}
