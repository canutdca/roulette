import { UuidMother } from '../../../../_shared/domain/UuidMother'
import { GroupId } from '../../../../../../src/contexts/core/_shared/domain/groups/GroupId'

export class GroupIdMother {
	static create(value: string): GroupId {
		return new GroupId(value)
	}
	static random(): GroupId {
		return this.create(UuidMother.random())
	}
}
