import { CeremonyId } from '../../_shared/domain/ceremonies/CeremonyId'
import { AggregateRoot } from '../../../_shared/domain/AggregateRoot'
import { CeremonyMember } from './CeremonyMember'
import { CeremonyMemberName } from './CeremonyMemberName'
import { CeremonyMemberStrikethrough } from './CeremonyMemberStrikethrough'
import { CeremonyCurrent } from './CeremonyCurrent';
import { CeremonyName } from '../../_shared/domain/ceremonies/CeremonyName'
import { CeremonyGroupId } from './CeremonyGroupId'

export class Ceremony extends AggregateRoot {

	constructor(
        readonly id: CeremonyId,
		readonly groupId: CeremonyGroupId,
        readonly name: CeremonyName,
        readonly members: CeremonyMember[],
        readonly current: CeremonyCurrent | null = null
    ) {
		super()
	}

	static fromPrimitives(plainData: {
		id: string
		groupId: string
		name: string
		members: {name: string, strikethrough: boolean}[]
        current: string
	}): Ceremony {
		return new Ceremony(
			new CeremonyId(plainData.id),
			new CeremonyGroupId(plainData.groupId),
			new CeremonyName(plainData.name),
            plainData.members.map((member: {name: string, strikethrough: boolean}) =>
                new CeremonyMember(new CeremonyMemberName(member.name), new CeremonyMemberStrikethrough(member.strikethrough))),
            plainData.current ? new CeremonyCurrent(plainData.current) : null
		)
	}

	toPrimitives(): any {
		return {
			id: this.id.value,
			groupId: this.groupId.value,
			name: this.name.value,
			members: this.members.map(member => ({name: member.name.value, strikethrough: member.strikethrough.value})),
            current: this.current ? this.current.value : null
		}
	}
}
