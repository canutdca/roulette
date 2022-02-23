import { CreateGroup } from '../../../../../src/contexts/core/groups/application/CreateGroup'
import { Group } from '../../../../../src/contexts/core/groups/domain/Group'
import { GroupName } from '../../../../../src/contexts/core/groups/domain/GroupName'
import { GroupId } from '../../../../../src/contexts/core/_shared/domain/Groups/GroupId'
import { GroupRepositoryMock } from '../__mocks__/GroupRepositoryMock'
import { CreateGroupRequestMother } from './CreateGroupRequestMother'

let repository: GroupRepositoryMock
let service: CreateGroup

beforeEach(() => {
	repository = new GroupRepositoryMock()
	service = new CreateGroup(repository)
})

describe('CreateGroup', () => {
	it('return valid groups', async () => {
		const request = CreateGroupRequestMother.random()
		await service.run(request)

		const expectedGroup = new Group(new GroupId(request.id), new GroupName(request.name))
		repository.assertLastSavedGroupIs(expectedGroup)
	})
})
