import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { ErrorToDelete } from '../../../../contexts/core/ceremonies/application/delete-ceremony-errors'
import { DeleteCeremonies } from '../../../../contexts/core/ceremonies/application/DeleteCeremonies'
import { Controller } from './Controller'

export class CeremoniesDeleteController implements Controller {
	constructor(private deleteCeremony: DeleteCeremonies) {}

	async run(req: Request, res: Response) {
		try {
			await this.deleteCeremony.run()
			res.status(httpStatus.OK).send()
		} catch (error) {
			if (error instanceof ErrorToDelete)
				res.status(httpStatus.BAD_REQUEST).send()
			throw error
		}
	}
}
