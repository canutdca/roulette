import { render, waitFor } from '@testing-library/react'
import { setupMockGet } from '__test-utils__/http.test-utils'
import { GroupDetail } from './GroupDetail'

const responseGetApi = { id: 'id1', name: 'group 1' }

describe('GroupDetail Test:', () => {
	describe('When component is rendered', () => {
		it('show group detail', async () => {
			const { mockGet } = setupMocks(responseGetApi)
			const expectedGroup = responseGetApi
			const component = render(<GroupDetail id={expectedGroup.id} />)
			await waitFor(() => expect(mockGet).toHaveBeenCalledTimes(1))
			await component.findByText(expectedGroup.name)
		})
	})
})

function setupMocks(_responseGetApi: any) {
	const { mockGet } = setupMockGet(_responseGetApi)
	return {
		mockGet
	}
}
