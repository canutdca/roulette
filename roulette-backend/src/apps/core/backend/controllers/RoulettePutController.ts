import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { Controller } from './Controller'
import { CreateRoulette } from '../../../../contexts/core/roulettes/application/CreateRoulette'

export class RoulettePutController implements Controller {
	constructor(private createRoulette: CreateRoulette) {}

	async run(req: Request, res: Response) {
		const { id, name, groupId, members, current } = req.body
		await this.createRoulette.run({id, name, groupId, members, current })

		res.status(httpStatus.OK).send()
	}
}
