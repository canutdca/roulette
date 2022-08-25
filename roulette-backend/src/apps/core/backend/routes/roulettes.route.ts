import { Router, Request, Response } from 'express'
import { body, param } from 'express-validator'
import { validateReqSchema } from '.'
import container from '../dependency-injection'

export const register = (router: Router) => {
	const roulettesGetController = container.get('Apps.core.controllers.RoulettesGetController')
	router.get('/roulettes', (req: Request, res: Response) => roulettesGetController.run(req, res))

	const reqSchemaRouletteGet = [ param('id').exists().isString() ]
	const rouletteGetController = container.get('Apps.core.controllers.RouletteGetController')
	router.get('/roulettes/:id', reqSchemaRouletteGet, validateReqSchema, (req: Request, res: Response) =>
		rouletteGetController.run(req, res))

	const reqSchemaRoulettePut = [ body('id').exists().isString(), body('name').isString().isLength({ min: 1 }), body('groupId').isString()]
	const roulettePutController = container.get('Apps.core.controllers.RoulettePutController')
	router.put('/roulettes', reqSchemaRoulettePut, validateReqSchema, (req: Request, res: Response) =>
		roulettePutController.run(req, res))

	const reqSchemaRouletteDelete = [ param('id').exists().isString() ]
	const rouletteDeleteController = container.get('Apps.core.controllers.RouletteDeleteController')
	router.delete('/roulettes/:id', reqSchemaRouletteDelete, validateReqSchema, (req: Request, res: Response) =>
		rouletteDeleteController.run(req, res))
}
