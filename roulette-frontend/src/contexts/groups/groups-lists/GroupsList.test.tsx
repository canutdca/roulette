import { render, waitFor } from '@testing-library/react'
import { GroupsList } from './GroupsList'

const responseGetApi = [
	{ id: 'id1', name: 'group 1' },
	{ id: 'id2', name: 'group 2' },
]

describe('GroupsList Test:', () => {
	describe('When component is rendered', () => {
		it('show list of groups', async () => {
			const { mockGet } = setupMocks()
			const expectedGroups = responseGetApi

			const component = render(<GroupsList />)

			await waitFor(() => expect(mockGet).toHaveBeenCalledTimes(1))
			for (const group of expectedGroups) await component.findByText(group.name)
		})
	})
})

function setupMocks() {
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
