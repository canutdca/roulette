import { GroupCeremonyId } from '../../../../../src/contexts/core/groups/domain/GroupCeremonyId';
import { UuidMother } from '../../../_shared/domain/UuidMother'

export class GroupCeremonyIdMother {
	static random(): GroupCeremonyId {
		return new GroupCeremonyId(UuidMother.random())
	}
}
