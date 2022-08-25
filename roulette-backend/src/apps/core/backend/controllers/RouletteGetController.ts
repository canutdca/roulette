import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { GetSingleRoulette } from '../../../../contexts/core/roulettes/application/GetSingleRoulette'
import { Controller } from './Controller'

export class RouletteGetController implements Controller {
	constructor(private getSingleRoulette: GetSingleRoulette) {}

	async run(req: Request, res: Response) {
		const { id } = req.params
		const roulette = await this.getSingleRoulette.run({id})

		if (!roulette) {
			res.status(httpStatus.NO_CONTENT).send()
			return
		}
		res.status(httpStatus.OK).send(roulette)
	}
}
