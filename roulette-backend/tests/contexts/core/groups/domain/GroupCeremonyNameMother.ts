import { GroupCeremonyName } from '../../../../../src/contexts/core/groups/domain/GroupCeremonyName';
import { WordMother } from '../../../_shared/domain/WordMother';

export class GroupCeremonyNameMother {
	static random(): GroupCeremonyName {
		return new GroupCeremonyName(WordMother.random())
	}
}
