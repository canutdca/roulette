import { ListMother } from './../../../_shared/domain/ListMother'
import { CreateGroupRequest } from '../../../../../src/contexts/core/groups/application/CreateGroupRequest'
import { GroupMember } from '../../../../../src/contexts/core/groups/domain/GroupMember'
import { GroupName } from '../../../../../src/contexts/core/groups/domain/GroupName'
import { GroupId } from '../../../../../src/contexts/core/_shared/domain/groups/GroupId'
import { GroupIdMother } from '../../_shared/domain/groups/GroupIdMother'
import { GroupNameMother } from '../domain/GroupNameMother'
import { GroupMemberMother } from '../domain/GroupMemberMother'
import { GroupRoulette } from '../../../../../src/contexts/core/groups/domain/GroupRoulette'
import { GroupRouletteMother } from '../domain/GroupRouletteMother'

export class CreateGroupRequestMother {
	static create(id: GroupId, name: GroupName, members: GroupMember[], roulettes: GroupRoulette[]): CreateGroupRequest {
		return {
			id: id.value,
			name: name.value,
			members: members.map(member => member.value),
			roulettes: roulettes.map(roulette => ({ id: roulette.id.value, name: roulette.name.value }))
		}
	}

	static random(): CreateGroupRequest {
		return this.create(
			GroupIdMother.random(),
			GroupNameMother.random(),
			ListMother.randomWithRandomElements(GroupMemberMother.random),
			ListMother.randomWithRandomElements(GroupRouletteMother.random)
		)
	}
}
