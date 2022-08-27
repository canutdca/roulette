import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { Controller } from './Controller'
import { CreateCeremony } from '../../../../contexts/core/ceremonies/application/CreateCeremony'

export class CeremonyPutController implements Controller {
	constructor(private createCeremony: CreateCeremony) {}

	async run(req: Request, res: Response) {
		const { id, name, groupId, members, current } = req.body
		await this.createCeremony.run({id, name, groupId, members, current })

		res.status(httpStatus.OK).send()
	}
}
