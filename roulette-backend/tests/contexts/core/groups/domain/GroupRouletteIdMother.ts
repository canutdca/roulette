import { GroupRouletteId } from '../../../../../src/contexts/core/groups/domain/GroupRouletteId';
import { UuidMother } from '../../../_shared/domain/UuidMother'

export class GroupRouletteIdMother {
	static random(): GroupRouletteId {
		return new GroupRouletteId(UuidMother.random())
	}
}
