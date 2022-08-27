import { ListMother } from './../../../_shared/domain/ListMother'
import { CreateGroupRequest } from '../../../../../src/contexts/core/groups/application/CreateGroupRequest'
import { GroupMember } from '../../../../../src/contexts/core/groups/domain/GroupMember'
import { GroupName } from '../../../../../src/contexts/core/groups/domain/GroupName'
import { GroupId } from '../../../../../src/contexts/core/_shared/domain/groups/GroupId'
import { GroupIdMother } from '../../_shared/domain/groups/GroupIdMother'
import { GroupNameMother } from '../domain/GroupNameMother'
import { GroupMemberMother } from '../domain/GroupMemberMother'
import { GroupCeremonyMother } from '../domain/GroupCeremonyMother'
import { GroupCeremony } from '../../../../../src/contexts/core/groups/domain/GroupCeremony'

export class CreateGroupRequestMother {
	static create(id: GroupId, name: GroupName, members: GroupMember[], ceremonies: GroupCeremony[]): CreateGroupRequest {
		return {
			id: id.value,
			name: name.value,
			members: members.map(member => member.value),
			ceremonies: ceremonies.map(ceremony => ({ id: ceremony.id.value, name: ceremony.name.value }))
		}
	}

	static random(): CreateGroupRequest {
		return this.create(
			GroupIdMother.random(),
			GroupNameMother.random(),
			ListMother.randomWithRandomElements(GroupMemberMother.random),
			ListMother.randomWithRandomElements(GroupCeremonyMother.random)
		)
	}
}
