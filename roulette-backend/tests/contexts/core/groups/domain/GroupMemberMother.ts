import { GroupMember } from '../../../../../src/contexts/core/groups/domain/GroupMember'
import { WordMother } from '../../../_shared/domain/WordMother'

export class GroupMemberMother {
	static random(): GroupMember {
		return new GroupMember(WordMother.random())
	}
}
