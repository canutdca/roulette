import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { GetCeremonies } from '../../../../contexts/core/ceremonies/application/GetCeremonies'
import { Controller } from './Controller'

export class CeremoniesGetController implements Controller {
	constructor(private getCeremonies: GetCeremonies) {}

	async run(_: Request, res: Response) {
		const ceremonies = await this.getCeremonies.run()
		res.status(httpStatus.OK).send(ceremonies.list)
	}
}
