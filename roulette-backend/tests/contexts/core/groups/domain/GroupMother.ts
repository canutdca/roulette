import { Group } from '../../../../../src/contexts/core/groups/domain/Group'
import { GroupName } from '../../../../../src/contexts/core/groups/domain/GroupName'
import { GroupId } from '../../../../../src/contexts/core/_shared/domain/groups/GroupId'
import { GroupIdMother } from '../../_shared/domain/groups/GroupIdMother'
import { GroupNameMother } from './GroupNameMother'

export class GroupMother {
	static create(id: GroupId, name: GroupName): Group {
		return new Group(id, name)
	}

	static random(): Group {
		return this.create(GroupIdMother.random(), GroupNameMother.random())
	}
}
