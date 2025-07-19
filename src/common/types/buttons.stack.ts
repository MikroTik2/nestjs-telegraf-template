import { IButton } from '@/common/interfaces'

import { I18nPath } from './translate.types.generated'

// Тип ButtonsStack описывает возможные структуры для кнопок в интерфейсе:
// - Массив кнопок (IButton[])
// - Массив массивов кнопок (IButton[][])
// - Массив путей для i18n (I18nPath[])
// - Массив массивов путей для i18n (I18nPath[][])
// - Массив, где каждый элемент — либо массив кнопок, либо массив путей для i18n
export type ButtonsStack = IButton[] | IButton[][] | I18nPath[] | I18nPath[][] | (IButton[] | I18nPath[])[]
