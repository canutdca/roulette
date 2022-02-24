import { Router, Request, Response } from 'express'
import { param, body } from 'express-validator'
import { validateReqSchema } from '.'
import container from '../dependency-injection'

export const register = (router: Router) => {
	const groupsGetController = container.get('Apps.core.controllers.GroupsGetController')
	router.get('/groups', (req: Request, res: Response) => groupsGetController.run(req, res))

	const reqSchemaGroupGet = [ param('id').exists().isString() ]
	const groupGetController = container.get('Apps.core.controllers.GroupGetController')
	router.get('/groups/:id', reqSchemaGroupGet, validateReqSchema, (req: Request, res: Response) =>
		groupGetController.run(req, res))

	const reqSchemaGroupPut = [ body('id').exists().isString(), body('name').isString().isLength({ min: 1 })]
	const groupPutController = container.get('Apps.core.controllers.GroupPutController')
	router.put('/groups', reqSchemaGroupPut, validateReqSchema, (req: Request, res: Response) =>
		groupPutController.run(req, res))
}
