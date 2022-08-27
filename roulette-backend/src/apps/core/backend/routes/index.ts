import httpStatus from 'http-status'
import { Router, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import glob from 'glob'

export function registerRoutes(router: Router) {
	const env = process.env.NODE_ENV || 'dev'
	const routes = glob.sync(__dirname + '/**/*.route.*')
	routes.push.apply(routes, glob.sync(__dirname + `/**/*.route_${env}.*`))
	routes.map(route => register(route, router))
}

function register(routePath: string, router: Router) {
	const route = require(routePath)
	route.register(router)
}

export function validateReqSchema(req: Request, res: Response, next: Function) {
	const validationErrors = validationResult(req)
	if (validationErrors.isEmpty()) {
		return next()
	}
	const errors = validationErrors.array().map(error => ({[error.param]: error.msg}))

	return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({errors})
}
