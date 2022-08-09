import { render, waitFor, fireEvent } from '@testing-library/react'
import { GroupsList } from './GroupsList'

const responseGetApi = [
	{ id: 'id1', name: 'group 1' },
	{ id: 'id2', name: 'group 2' },
]

const mockLocation = jest.fn()
jest.mock('wouter', () => {
	return {
		useLocation: ['', () => jest.fn()]
	}
})

describe('GroupsList Test:', () => {
	
	describe('When user click to navigate', () => {
		it('go to "new group"', async () => {
			const { mockGet } = setupMocks()

			const component = render(<GroupsList />)
			
			fireEvent.click(component.getByRole('button'))
			// expect(mockLocation).toHaveBeenCalledTimes(1)
			
			// console.log(button)
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
