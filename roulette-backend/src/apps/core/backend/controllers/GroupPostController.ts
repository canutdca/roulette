import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { CreateGroup } from '../../../../contexts/core/groups/application/CreateGroup'
import { Controller } from './Controller'

export class GroupPostController implements Controller {
	constructor(private CreateGroup: CreateGroup) {}

	async run(req: Request, res: Response) {
		const { id, name } = req.body
		await this.CreateGroup.run({id, name})

		res.status(httpStatus.CREATED).send()
	}
}
