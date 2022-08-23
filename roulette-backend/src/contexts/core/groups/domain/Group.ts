import { GroupId } from '../../_shared/domain/groups/GroupId'
import { GroupName } from './GroupName'
import { AggregateRoot } from '../../../_shared/domain/AggregateRoot'
import { GroupMember } from './GroupMember'
import { GroupRoulette } from './GroupRoulette'
import { GroupRouletteId } from './GroupRouletteId';
import { GroupRouletteName } from './GroupRouletteName'

export class Group extends AggregateRoot {
	readonly id: GroupId
	readonly name: GroupName
	readonly members: GroupMember[]
	readonly roulettes: GroupRoulette[]

	constructor(id: GroupId, name: GroupName, members: GroupMember[], roulettes: GroupRoulette[]) {
		super()
		this.id = id
		this.name = name
		this.members = members
		this.roulettes = roulettes
	}

	static fromPrimitives(plainData: {
		id: string
		name: string
		members: string[]
		roulettes: {id: string, name: string}[]
	}): Group {
		return new Group(
			new GroupId(plainData.id),
			new GroupName(plainData.name),
			plainData.members.map(member => new GroupMember(member)),
			plainData.roulettes.map(roulette => new GroupRoulette(new GroupRouletteId(roulette.id), new GroupRouletteName(roulette.name)))
		)
	}

	toPrimitives(): any {
		return {
			id: this.id.value,
			name: this.name.value,
			members: this.members.map(member => member.value),
			roulettes: this.roulettes.map(roulette => ({ id: roulette.id.value, name: roulette.name.value })),
		}
	}
}
