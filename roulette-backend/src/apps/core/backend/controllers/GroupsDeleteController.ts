import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { ErrorToDelete } from '../../../../contexts/core/groups/application/delete-group-errors'
import { DeleteGroups } from '../../../../contexts/core/groups/application/DeleteGroups'
import { Controller } from './Controller'

export class GroupsDeleteController implements Controller {
	constructor(private deleteGroups: DeleteGroups) {}

	async run(req: Request, res: Response) {
		try {
			await this.deleteGroups.run()
			res.status(httpStatus.OK).send()
		} catch (error) {
			if (error instanceof ErrorToDelete)
				res.status(httpStatus.BAD_REQUEST).send()
			throw error
		}
	}
}
