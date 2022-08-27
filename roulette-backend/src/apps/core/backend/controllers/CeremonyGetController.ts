import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { GetSingleCeremony } from '../../../../contexts/core/ceremonies/application/GetSingleCeremony'
import { Controller } from './Controller'

export class CeremonyGetController implements Controller {
	constructor(private getSingleCeremony: GetSingleCeremony) {}

	async run(req: Request, res: Response) {
		const { id } = req.params
		const ceremony = await this.getSingleCeremony.run({id})

		if (!ceremony) {
			res.status(httpStatus.NO_CONTENT).send()
			return
		}
		res.status(httpStatus.OK).send(ceremony)
	}
}
