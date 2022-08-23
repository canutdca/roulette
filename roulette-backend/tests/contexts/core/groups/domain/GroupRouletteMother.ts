import { GroupRoulette } from '../../../../../src/contexts/core/groups/domain/GroupRoulette'
import { GroupRouletteIdMother } from './GroupRouletteIdMother';
import { GroupRouletteNameMother } from './GroupRouletteNameMother';

export class GroupRouletteMother {
	static random(): GroupRoulette {
		return new GroupRoulette(GroupRouletteIdMother.random(), GroupRouletteNameMother.random())
	}
}
