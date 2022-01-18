import { Router, Request, Response } from 'express'
import container from '../dependency-injection'

export const register = (router: Router) => {
	const groupsGetController = container.get('Apps.core.controllers.GroupsGetController')
	router.get('/groups', (req: Request, res: Response) => groupsGetController.run(req, res))
}
