import assert from 'assert'
import request from 'supertest'
import { AfterAll, BeforeAll, Given, When, Then } from 'cucumber'
import { CoreBackendApp } from './../../../../../../src/apps/core/backend/CoreBackendApp'

let _request: request.Test
let application: CoreBackendApp
let _response: request.Response

Given('a course with id {string} already exists', async (id: string) => {
	const test = request(application.httpServer)
	const group = {
		id,
		name: 'e2e test group name'
	}
	await test.put('/groups').send(group)
})

When('I send a GET request to {string}', (route: string) => {
	_request = request(application.httpServer).get(route)
})

When('I send a PUT request to {string} with body:', (route: string, body: string) => {
	_request = request(application.httpServer).put(route).send(JSON.parse(body))
})

When('I send a DELETE request to {string}', (route: string) => {
	_request = request(application.httpServer).delete(route)
})

Then('the response status code should be {int}', async (statusCode: number) => {
	_response = await _request.expect(statusCode)
})

Then('the response should not be empty', () => {
	assert.notDeepEqual(_response.body, {})
})

Then('the response should be empty', () => {
	assert.deepEqual(_response.body, {})
})

BeforeAll(async () => {
	application = new CoreBackendApp()
	await application.start()
})

AfterAll(async () => {
	await application.stop()
})
