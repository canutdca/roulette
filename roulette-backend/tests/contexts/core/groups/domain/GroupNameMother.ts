import { GroupName } from '../../../../../src/contexts/core/groups/domain/GroupName'
import { WordMother } from '../../../_shared/domain/WordMother'

export class GroupNameMother {
	static create(value: string): GroupName {
		return new GroupName(value)
	}
	static random(): GroupName {
		return this.create(WordMother.random())
	}

	static invalidName(): string {
		return 'a'.repeat(40)
	}
}
