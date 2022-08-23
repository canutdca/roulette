import { CreateGroup } from '../../../../../src/contexts/core/groups/application/CreateGroup'
import { Group } from '../../../../../src/contexts/core/groups/domain/Group'
import { GroupMember } from '../../../../../src/contexts/core/groups/domain/GroupMember'
import { GroupName } from '../../../../../src/contexts/core/groups/domain/GroupName'
import { GroupRoulette } from '../../../../../src/contexts/core/groups/domain/GroupRoulette'
import { GroupRouletteId } from '../../../../../src/contexts/core/groups/domain/GroupRouletteId'
import { GroupRouletteName } from '../../../../../src/contexts/core/groups/domain/GroupRouletteName'
import { GroupId } from '../../../../../src/contexts/core/_shared/domain/groups/GroupId'
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

		const expectedGroup = new Group(
			new GroupId(request.id),
			new GroupName(request.name),
			request.members?.map(member => new GroupMember(member)) || [],
			request.roulettes?.map(roulette => new GroupRoulette(new GroupRouletteId(roulette.id), new GroupRouletteName(roulette.name))) || []
		)
		repository.assertLastSavedGroupIs(expectedGroup)
	})
})
