import { GroupRouletteName } from '../../../../../src/contexts/core/groups/domain/GroupRouletteName';
import { WordMother } from '../../../_shared/domain/WordMother';

export class GroupRouletteNameMother {
	static random(): GroupRouletteName {
		return new GroupRouletteName(WordMother.random())
	}
}
