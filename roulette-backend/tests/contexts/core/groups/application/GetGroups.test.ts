import { GetGroups } from '../../../../../src/contexts/core/groups/application/GetGroups'
import { GroupRepositoryMock } from './../__mocks__/GroupRepositoryMock'

let repository: GroupRepositoryMock
let service: GetGroups

beforeEach(() => {
	repository = new GroupRepositoryMock()
	service = new GetGroups(repository)
})

describe('GetGroups', () => {
	it('return valid groups', async () => {
		const result = await service.run()

		result.list.forEach(group => {
			expect(group.id).toBeTruthy()
			expect(group.name).toBeTruthy()
		})
	})
})
