import { Scene } from 'nestjs-telegraf'

import { I18nPath } from '@/common/types'

/**
 * Декоратор для объявления сцены в nestjs-telegraf.
 * Используется для пометки класса как сцены с определённым sceneId.
 * @param sceneId - идентификатор сцены (строка)
 * @returns ClassDecorator
 */
export function SceneDecorator(sceneId: I18nPath): ClassDecorator {
	return Scene(sceneId as string)
}
