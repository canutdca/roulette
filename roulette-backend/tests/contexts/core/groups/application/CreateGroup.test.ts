import { CreateGroup } from '../../../../../src/contexts/core/groups/application/CreateGroup'
import { Group } from '../../../../../src/contexts/core/groups/domain/Group'
import { GroupMember } from '../../../../../src/contexts/core/groups/domain/GroupMember'
import { GroupName } from '../../../../../src/contexts/core/groups/domain/GroupName'
import { GroupCeremonyId } from '../../../../../src/contexts/core/groups/domain/GroupCeremonyId'
import { GroupCeremonyName } from '../../../../../src/contexts/core/groups/domain/GroupCeremonyName'
import { GroupId } from '../../../../../src/contexts/core/_shared/domain/groups/GroupId'
import { GroupRepositoryMock } from '../__mocks__/GroupRepositoryMock'
import { CreateGroupRequestMother } from './CreateGroupRequestMother'
import { GroupCeremony } from '../../../../../src/contexts/core/groups/domain/GroupCeremony'
import { DeleteCeremonyMock } from '../__mocks__/DeleteCeremonyMock';
import { CreateCeremonyMock } from '../__mocks__/CreateCeremonyMock'

let repository: GroupRepositoryMock
let createCeremony: CreateCeremonyMock
let deleteCeremony: DeleteCeremonyMock
let service: CreateGroup

beforeEach(() => {
	repository = new GroupRepositoryMock()
	createCeremony= new CreateCeremonyMock()
	deleteCeremony = new DeleteCeremonyMock()
	service = new CreateGroup(repository, createCeremony, deleteCeremony)
})

describe('CreateGroup', () => {
	it('return valid groups', async () => {
		const request = CreateGroupRequestMother.random()
		await service.run(request)

		const expectedGroup = new Group(
			new GroupId(request.id),
			new GroupName(request.name),
			request.members?.map(member => new GroupMember(member)) || [],
			request.ceremonies?.map(ceremony => new GroupCeremony(new GroupCeremonyId(ceremony.id), new GroupCeremonyName(ceremony.name))) || []
		)
		repository.assertLastSavedGroupIs(expectedGroup)
	})
})
