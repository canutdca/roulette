import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { GetSingleGroup } from '../../../../contexts/core/groups/application/GetSingleGroup'
import { Controller } from './Controller'

export class GroupGetController implements Controller {
	constructor(private getSingleGroup: GetSingleGroup) {}

	async run(req: Request, res: Response) {
		const { id } = req.params
		const group = await this.getSingleGroup.run({id})

		if (!group) {
			res.status(httpStatus.NO_CONTENT).send()
			return
		}
		res.status(httpStatus.OK).send(group)
	}
}
