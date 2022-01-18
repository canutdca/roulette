import { GetGroups } from '../../../../../src/contexts/core/groups/application/GetGroups'
import { GroupName } from '../../../../../src/contexts/core/groups/domain/GroupName'
import { GroupId } from '../../../../../src/contexts/core/_shared/domain/Groups/GroupId'
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
			const groupId = new GroupId(group.id)
			expect(group.id).toEqual(groupId.value)
			const groupName = new GroupName(group.name)
			expect(group.name).toEqual(groupName.value)
		})
	})
})
