import { GroupName } from '../../../../../src/contexts/core/groups/domain/GroupName'
import { WordMother } from '../../../_shared/domain/WordMother'

export class GroupNameMother {
	static random(): GroupName {
		return new GroupName(WordMother.random())
	}

	static invalidName(): string {
		return 'a'.repeat(40)
	}
}
