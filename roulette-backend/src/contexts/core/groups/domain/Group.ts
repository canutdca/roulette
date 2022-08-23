import { GroupId } from '../../_shared/domain/Groups/GroupId'
import { GroupName } from './GroupName'
import { AggregateRoot } from '../../../_shared/domain/AggregateRoot'
import { GroupMember } from './GroupMember'

export class Group extends AggregateRoot {
	readonly id: GroupId
	readonly name: GroupName
	readonly members: GroupMember[]

	constructor(id: GroupId, name: GroupName, members: GroupMember[]) {
		super()
		this.id = id
		this.name = name
		this.members = members
	}

	static fromPrimitives(plainData: {
		id: string
		name: string
		members: string[]
	}): Group {
		return new Group(
			new GroupId(plainData.id),
			new GroupName(plainData.name),
			plainData.members.map(member => new GroupMember(member))
		)
	}

	toPrimitives(): any {
		return {
			id: this.id.value,
			name: this.name.value,
			members: this.members.map(member => member.value)
		}
	}
}
