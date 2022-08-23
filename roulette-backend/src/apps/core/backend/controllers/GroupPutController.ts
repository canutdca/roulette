import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { CreateGroup } from '../../../../contexts/core/groups/application/CreateGroup'
import { Controller } from './Controller'

export class GroupPutController implements Controller {
	constructor(private createGroup: CreateGroup) {}

	async run(req: Request, res: Response) {
		const { id, name, members } = req.body
		await this.createGroup.run({id, name, members: (members as string).split(',')})

		res.status(httpStatus.OK).send()
	}
}
