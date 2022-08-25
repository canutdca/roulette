import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { GetRoulettes } from '../../../../contexts/core/roulettes/application/GetRoulettes'
import { Controller } from './Controller'

export class RoulettesGetController implements Controller {
	constructor(private getRoulettes: GetRoulettes) {}

	async run(_: Request, res: Response) {
		const roulettes = await this.getRoulettes.run()
		res.status(httpStatus.OK).send(roulettes.list)
	}
}
