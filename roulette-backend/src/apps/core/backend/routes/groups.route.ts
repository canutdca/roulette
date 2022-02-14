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

	const reqSchemaGroupPost = [ body('id').exists().isString(), body('name').exists().isString()]
	const groupPostController = container.get('Apps.core.controllers.GroupPostController')
	router.post('/groups', reqSchemaGroupPost, validateReqSchema, (req: Request, res: Response) =>
		groupPostController.run(req, res))
}
