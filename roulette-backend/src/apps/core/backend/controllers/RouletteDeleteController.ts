import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { ErrorToDelete } from '../../../../contexts/core/roulettes/application/delete-Roulette-errors'
import { DeleteRoulette } from '../../../../contexts/core/roulettes/application/DeleteRoulette'
import { Controller } from './Controller'

export class RouletteDeleteController implements Controller {
	constructor(private deleteRoulette: DeleteRoulette) {}

	async run(req: Request, res: Response) {
		const { id } = req.params
		try {
			await this.deleteRoulette.run({id})
			res.status(httpStatus.OK).send()
		} catch (error) {
			if (error instanceof ErrorToDelete)
				res.status(httpStatus.BAD_REQUEST).send()
			throw error
		}
	}
}
