export function setupMockGet(responseGetApi: any) {
	const mockGet = jest.fn(() =>
	({
		ok: true,
		json: () => Promise.resolve(responseGetApi)
	})) as jest.Mock

	global.fetch = mockGet

	return {
		mockGet
	}
}