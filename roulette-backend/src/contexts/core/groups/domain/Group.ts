import { GroupId } from '../../_shared/domain/groups/GroupId'
import { GroupName } from './GroupName'
import { AggregateRoot } from '../../../_shared/domain/AggregateRoot'
import { GroupMember } from './GroupMember'
import { GroupCeremony } from './GroupCeremony'
import { GroupCeremonyId } from './GroupCeremonyId';
import { GroupCeremonyName } from './GroupCeremonyName'

export class Group extends AggregateRoot {
	readonly id: GroupId
	readonly name: GroupName
	readonly members: GroupMember[]
	readonly ceremonies: GroupCeremony[]

	constructor(id: GroupId, name: GroupName, members: GroupMember[], ceremonies: GroupCeremony[]) {
		super()
		this.id = id
		this.name = name
		this.members = members
		this.ceremonies = ceremonies
	}

	static fromPrimitives(plainData: {
		id: string
		name: string
		members: string[]
		ceremonies: {id: string, name: string}[]
	}): Group {
		return new Group(
			new GroupId(plainData.id),
			new GroupName(plainData.name),
			plainData.members?.map(member => new GroupMember(member)),
			plainData.ceremonies?.map(ceremony => new GroupCeremony(new GroupCeremonyId(ceremony.id), new GroupCeremonyName(ceremony.name)))
		)
	}

	toPrimitives(): any {
		return {
			id: this.id.value,
			name: this.name.value,
			members: this.members.map(member => member.value),
			ceremonies: this.ceremonies.map(ceremony => ({ id: ceremony.id.value, name: ceremony.name.value })),
		}
	}
}
