import { RouletteId } from '../../_shared/domain/roulettes/RouletteId'
import { AggregateRoot } from '../../../_shared/domain/AggregateRoot'
import { RouletteMember } from './RouletteMember'
import { RouletteMemberName } from './RouletteMemberName'
import { RouletteMemberStrikethrough } from './RouletteMemberStrikethrough'
import { RouletteCurrent } from './RouletteCurrent';
import { RouletteName } from '../../_shared/domain/roulettes/RouletteName'

export class Roulette extends AggregateRoot {

	constructor(
        readonly id: RouletteId,
        readonly name: RouletteName,
        readonly members: RouletteMember[] = [],
        readonly current: RouletteCurrent | null = null
    ) {
		super()
	}

	static fromPrimitives(plainData: {
		id: string
		name: string
		members: {name: string, strikethrough: boolean}[]
        current: string
	}): Roulette {
		return new Roulette(
			new RouletteId(plainData.id),
			new RouletteName(plainData.name),
            plainData.members.map((member: {name: string, strikethrough: boolean}) =>
                new RouletteMember(new RouletteMemberName(member.name), new RouletteMemberStrikethrough(member.strikethrough))),
            plainData.current ? new RouletteCurrent(plainData.current) : null
		)
	}

	toPrimitives(): any {
		return {
			id: this.id.value,
			name: this.name.value,
			members: this.members.map(member => ({name: member.name.value, strikethrough: member.strikethrough.value})),
            current: this.current?.value
		}
	}
}
