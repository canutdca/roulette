import { Router, Request, Response } from 'express'
import container from '../dependency-injection'

export const register = (router: Router) => {
	const ceremoniesDeleteController = container.get('Apps.core.controllers.CeremoniesDeleteController')
	router.delete('/ceremonies', (req: Request, res: Response) => ceremoniesDeleteController.run(req, res))
}
