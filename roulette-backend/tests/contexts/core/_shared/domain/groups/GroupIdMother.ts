import { UuidMother } from '../../../../_shared/domain/UuidMother'
import { GroupId } from '../../../../../../src/contexts/core/_shared/domain/groups/GroupId'

export class GroupIdMother {
	static random(): GroupId {
		return new GroupId(UuidMother.random())
	}
}
