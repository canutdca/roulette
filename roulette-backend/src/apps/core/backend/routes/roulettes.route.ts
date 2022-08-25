import { Router, Request, Response } from 'express'
import { body } from 'express-validator'
import { validateReqSchema } from '.'
import container from '../dependency-injection'

export const register = (router: Router) => {
	const rouletteGetController = container.get('Apps.core.controllers.RoulettesGetController')
	router.get('/roulettes', (req: Request, res: Response) => rouletteGetController.run(req, res))

	const reqSchemaRoulettePut = [ body('id').exists().isString(), body('name').isString().isLength({ min: 1 })]
	const roulettePutController = container.get('Apps.core.controllers.RoulettePutController')
	router.put('/roulettes', reqSchemaRoulettePut, validateReqSchema, (req: Request, res: Response) =>
		roulettePutController.run(req, res))
}
