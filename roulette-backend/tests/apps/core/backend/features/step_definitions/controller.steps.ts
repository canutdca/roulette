import assert from 'assert'
import request from 'supertest'
import { AfterAll, BeforeAll, Given, Then } from 'cucumber'
import { CoreBackendApp } from './../../../../../../src/apps/core/backend/CoreBackendApp'

let _request: request.Test
let application: CoreBackendApp
let _response: request.Response

Given('I send a GET request to {string}', (route: string) => {
	const asd = request(application.httpServer)
	_request = asd.get(route)
})

Then('the response status code should be {int}', async (statusCode: number) => {
	_response = await _request.expect(statusCode)
})

Then('the response should not be empty', () => {
	assert.notDeepEqual(_response.body, {})
})

BeforeAll(async () => {
	application = new CoreBackendApp()
	await application.start()
})

AfterAll(async () => {
	await application.stop()
})
