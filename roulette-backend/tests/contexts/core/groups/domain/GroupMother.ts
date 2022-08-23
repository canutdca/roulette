import { ListMother } from './../../../_shared/domain/ListMother'
import { Group } from '../../../../../src/contexts/core/groups/domain/Group'
import { GroupId } from '../../../../../src/contexts/core/_shared/domain/groups/GroupId'
import { GroupIdMother } from '../../_shared/domain/groups/GroupIdMother'
import { GroupNameMother } from './GroupNameMother'
import { GroupMemberMother } from './GroupMemberMother'
import { GroupRouletteMother } from './GroupRouletteMother'

export class GroupMother {
	static random(): Group {
		return new Group(
			GroupIdMother.random(),
			GroupNameMother.random(),
			ListMother.randomWithRandomElements(GroupMemberMother.random),
			ListMother.randomWithRandomElements(GroupRouletteMother.random)
		)
	}

	static randomButId(id: GroupId): Group {
		return new Group(
			id,
			GroupNameMother.random(),
			ListMother.randomWithRandomElements(GroupMemberMother.random),
			ListMother.randomWithRandomElements(GroupRouletteMother.random)
		)
	}
}
