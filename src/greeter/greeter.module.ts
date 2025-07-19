import { Module } from '@nestjs/common'

import { SessionModule } from '@/libs/session/session.module'

import { GreeterUpdate } from './greeter.update'

@Module({
	imports: [SessionModule],
	providers: [GreeterUpdate]
})
export class GreeterModule {}
