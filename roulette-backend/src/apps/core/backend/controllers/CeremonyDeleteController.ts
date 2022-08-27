import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { ErrorToDelete } from '../../../../contexts/core/ceremonies/application/delete-ceremony-errors'
import { DeleteCeremony } from '../../../../contexts/core/ceremonies/application/DeleteCeremony'
import { Controller } from './Controller'

export class CeremonyDeleteController implements Controller {
	constructor(private deleteCeremony: DeleteCeremony) {}

	async run(req: Request, res: Response) {
		const { id } = req.params
		try {
			await this.deleteCeremony.run({id})
			res.status(httpStatus.OK).send()
		} catch (error) {
			if (error instanceof ErrorToDelete)
				res.status(httpStatus.BAD_REQUEST).send()
			throw error
		}
	}
}
