import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { GetGroups } from '../../../../contexts/core/groups/application/GetGroups'
import { Controller } from './Controller'

export class GroupsGetController implements Controller {
	constructor(private getGroups: GetGroups) {}

	async run(_: Request, res: Response) {
		const groups = await this.getGroups.run()
		res.status(httpStatus.OK).send(groups.list)
	}
}
