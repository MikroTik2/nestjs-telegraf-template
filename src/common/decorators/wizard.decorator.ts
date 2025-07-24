import { Wizard } from 'nestjs-telegraf'

import { I18nPath } from '@/common/types'

/**
 * Декоратор для объявления wizard-сцены в nestjs-telegraf.
 * Используется для пометки класса как пошаговой сцены (Wizard) с заданным sceneId.
 * @param sceneId - идентификатор сцены (строка)
 * @returns ClassDecorator
 */
export function WizardDecorator(sceneId: I18nPath): ClassDecorator {
	return Wizard(sceneId as string)
}
