import { GroupCeremony } from '../../../../../src/contexts/core/groups/domain/GroupCeremony';
import { GroupCeremonyIdMother } from './GroupCeremonyIdMother';
import { GroupCeremonyNameMother } from './GroupCeremonyNameMother';

export class GroupCeremonyMother {
	static random(): GroupCeremony {
		return new GroupCeremony(GroupCeremonyIdMother.random(), GroupCeremonyNameMother.random())
	}
}
