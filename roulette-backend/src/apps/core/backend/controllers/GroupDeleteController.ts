import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { ErrorToDelete } from '../../../../contexts/core/groups/application/delete-group-errors'
import { DeleteSingleGroup } from '../../../../contexts/core/groups/application/DeleteSingleGroup'
import { Controller } from './Controller'

export class GroupDeleteController implements Controller {
	constructor(private deleteGroup: DeleteSingleGroup) {}

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
