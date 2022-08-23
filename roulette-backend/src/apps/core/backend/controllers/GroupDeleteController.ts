import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { ErrorToDelete } from '../../../../contexts/core/groups/application/delete-group-errors'
import { DeleteGroup } from '../../../../contexts/core/groups/application/DeleteGroup'
import { Controller } from './Controller'

export class GroupDeleteController implements Controller {
	constructor(private deleteGroup: DeleteGroup) {}

	async run(req: Request, res: Response) {
		const { id } = req.params
		try {
			await this.deleteGroup.run({id})
			res.status(httpStatus.OK).send()
		} catch (error) {
			if (error instanceof ErrorToDelete)
				res.status(httpStatus.BAD_REQUEST).send()
			throw error
		}
	}
}
