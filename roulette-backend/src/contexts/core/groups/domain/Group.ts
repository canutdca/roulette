import { GroupId } from '../../_shared/domain/Groups/GroupId'
import { GroupName } from './GroupName'
import { AggregateRoot } from '../../../_shared/domain/AggregateRoot'

export class Group extends AggregateRoot {
	readonly id: GroupId
	readonly name: GroupName

	constructor(id: GroupId, name: GroupName) {
		super()
		this.id = id
		this.name = name
	}

	static fromPrimitives(plainData: {
		id: string
		name: string
	}): Group {
		return new Group(
			new GroupId(plainData.id),
			new GroupName(plainData.name),
		)
	}

	toPrimitives(): any {
		return {
			id: this.id.value,
			name: this.name.value,
		}
	}
}
