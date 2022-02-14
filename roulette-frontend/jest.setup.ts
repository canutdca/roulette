import '@testing-library/jest-dom'

beforeEach(() => {
	global.fetch = jest.fn().mockRejectedValue(new Error('Failed to fetch'))
})


function setupFetchMock(method: 'GET' | 'POST', response: any) {
	const mockGet = jest.fn(() =>
	({
		ok: true,
		json: () => Promise.resolve(response)
	})) as jest.Mock

	global.fetch = mockGet

	return {
		mockGet
	}
}
