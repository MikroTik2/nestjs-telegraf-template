import { Context as BaseContext, Scenes as TelegrafScenes } from 'telegraf'
import { CallbackQuery, Message, Update } from 'telegraf/typings/core/types/typegram'
import { SceneContextScene, WizardContextWizard, WizardSession, WizardSessionData } from 'telegraf/typings/scenes'

import { I18nPath, Langs } from '@/common/types'

import { ICreateEntity } from './create.interface'
import { IPagination } from './pagination.interface'

export interface IContext extends BaseContext {
	update: Update.CallbackQueryUpdate & { message: Message.PhotoMessage }
	scene: ISceneContextScene
	wizard: IWizardContext
	session: SessionData
	message: Update.New & Update.NonChannel & Message & { text?: string }
	callbackQuery: CallbackQuery & { data: string }
}

interface IWizardContext extends WizardContextWizard<IContext> {}

interface ISceneContextScene extends SceneContextScene<IContext, SceneSession> {
	enter: (sceneId: I18nPath) => Promise<unknown>
}

interface SessionData extends TelegrafScenes.SceneSession<SceneSession>, WizardSession<SceneSession> {
	creation?: ICreateEntity
	pagination: Partial<IPagination>
	image: string
	messageId?: number
	lang: Langs
	isAdmin: boolean
}

interface SceneSession extends WizardSessionData {
	state: {
		token?: string
	}
}
