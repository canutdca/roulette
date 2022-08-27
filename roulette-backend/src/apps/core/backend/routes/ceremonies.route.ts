import { Router, Request, Response } from 'express'
import { body, param } from 'express-validator'
import { validateReqSchema } from '.'
import container from '../dependency-injection'

export const register = (router: Router) => {
	const ceremoniesGetController = container.get('Apps.core.controllers.CeremoniesGetController')
	router.get('/ceremonies', (req: Request, res: Response) => ceremoniesGetController.run(req, res))

	const reqSchemaCeremonyGet = [ param('id').exists().isString() ]
	const ceremonyGetController = container.get('Apps.core.controllers.CeremonyGetController')
	router.get('/ceremonies/:id', reqSchemaCeremonyGet, validateReqSchema, (req: Request, res: Response) =>
		ceremonyGetController.run(req, res))

	const reqSchemaCeremonyPut = [ body('id').exists().isString(), body('name').isString().isLength({ min: 1 }), body('groupId').isString()]
	const ceremonyPutController = container.get('Apps.core.controllers.CeremonyPutController')
	router.put('/ceremonies', reqSchemaCeremonyPut, validateReqSchema, (req: Request, res: Response) =>
		ceremonyPutController.run(req, res))

	const reqSchemaCeremonyDelete = [ param('id').exists().isString() ]
	const ceremonyDeleteController = container.get('Apps.core.controllers.CeremonyDeleteController')
	router.delete('/ceremonies/:id', reqSchemaCeremonyDelete, validateReqSchema, (req: Request, res: Response) =>
		ceremonyDeleteController.run(req, res))
}
