import { render, act, waitFor, fireEvent } from '@testing-library/react'
import { GroupsList } from './GroupsList'
import { mockSetLocation } from '__mocks__/wouter'
import { setupMockGet } from '__test-utils__/http.test-utils'
import { GROUP_PAGE_ROUTE } from '../../../routes'

const responseGetApi = [
	{ id: 'id1', name: 'group 1' },
	{ id: 'id2', name: 'group 2' },
]

describe('GroupsList Test:', () => {
	describe('When component is rendered', () => {
		it('show all elements"', async () => {
			const { mockGet } = setupMocks(responseGetApi)
			const component = render(<GroupsList />)

			await waitFor(() => expect(mockGet).toHaveBeenCalledTimes(1))
			responseGetApi.forEach(item => {
				expect(component.getByText(item.name))
			})
		})
	})

	describe('When user click to navigate', () => {
		it('go to "new group"', async () => {
			setupMocks(responseGetApi)
			const component = render(<GroupsList />)

			await waitFor(() => fireEvent.click(component.getByText('New group')))
			expect(mockSetLocation).toHaveBeenCalledWith(GROUP_PAGE_ROUTE)
		})
	})

	describe('When user click to one existing group', () => {
		it('go to detail of this group', async () => {
			setupMocks(responseGetApi)
			const component = render(<GroupsList />)

			const groupClicked = responseGetApi[0]
			await waitFor(() => fireEvent.click(component.getByText(groupClicked.name)))
			expect(mockSetLocation).toHaveBeenCalledWith(`${GROUP_PAGE_ROUTE}/${groupClicked.id}`)
		})
	})
})

function setupMocks(_responseGetApi: any) {
	const { mockGet } = setupMockGet(_responseGetApi)
	return {
		mockGet
	}
}
