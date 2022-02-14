import { render, waitFor } from '@testing-library/react'
import { GroupDetail } from './GroupDetail'

const responseGetApi = { id: 'id1', name: 'group 1' }

describe('GroupDetail Test:', () => {
	describe('When component is rendered', () => {
		it('show group detail', async () => {
			const { mockGet } = setupMocks()
			const expectedGroup = responseGetApi

			const component = render(<GroupDetail id={expectedGroup.id} />)

			await waitFor(() => expect(mockGet).toHaveBeenCalledTimes(1))
			await component.findByText(expectedGroup.name)
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
