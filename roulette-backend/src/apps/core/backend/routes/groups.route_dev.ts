import { Router, Request, Response } from 'express'
import container from '../dependency-injection'

export const register = (router: Router) => {
	const groupsDeleteController = container.get('Apps.core.controllers.GroupsDeleteController')
	router.delete('/groups', (req: Request, res: Response) => groupsDeleteController.run(req, res))
}
