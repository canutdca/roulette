import { GetSingleGroup } from '../../../../../src/contexts/core/groups/application/GetSingleGroup'
import { GroupRepositoryMock } from '../__mocks__/GroupRepositoryMock'
import { GetSingleGroupRequestMother } from './GetSingleGroupRequestMother'

let repository: GroupRepositoryMock
let service: GetSingleGroup

beforeEach(() => {
	repository = new GroupRepositoryMock()
	service = new GetSingleGroup(repository)
})

describe('GetSingleGroup', () => {
	it('return valid group', async () => {
		const request = GetSingleGroupRequestMother.random()
		const group = (await service.run(request))!

		expect(group.id).toBeTruthy()
		expect(group.name).toBeTruthy()
	})
})
