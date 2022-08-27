import { GroupCeremonyId } from './GroupCeremonyId';
import { GroupCeremonyName } from './GroupCeremonyName';

export class GroupCeremony {
    constructor(public readonly id: GroupCeremonyId, public readonly name: GroupCeremonyName) {}
}
