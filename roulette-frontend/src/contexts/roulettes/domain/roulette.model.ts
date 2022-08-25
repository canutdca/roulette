import { RouletteMember } from './roulette-member.model'
import { Cloneable } from 'contexts/_shared/domain/Cloneable.model'
import { Saveable } from 'contexts/_shared/domain/Saveable.model'
import { randomIntFromInterval } from '../../../_shared/utils/numbers.utils';

export class Roulette implements Saveable, Cloneable<Roulette> {
	#id: string
	get id(): string {
		return this.#id
	}

	#groupId: string
	get groupId(): string {
		return this.#groupId
	}

	#name: string
	get name(): string {
		return this.#name
	}
	set name(value: string) {
		this.#name = value
	}

	#members: RouletteMember[]
	get members(): RouletteMember[] {
		return this.#members
	}

	#current: string | null
	get current(): string | null {
		return this.#current
	}

	#candidateToCurrent: string | null
	get candidateToCurrent(): string | null {
		return this.#candidateToCurrent
	}

	get availableToPlay(): boolean {
		return this.#members.some(member => !member.strikethrough)
	}

	constructor(id: string, groupId: string, name: string, members: { name: string, strikethrough: boolean }[], current: string | null) {
		this.#id = id
		this.#groupId = groupId
		this.#name = name
		this.#members = members?.map(member => new RouletteMember(member.name, member.strikethrough))
		this.#current = current
		this.#candidateToCurrent = null
	}

	setStrikethroughMember(index: number) {
		this.searchMember(index).strikethrough = true
	}

	setActiveMember(index: number) {
		this.searchMember(index).strikethrough = false
	}

	private searchMember(index: number): RouletteMember {
		return this.#members[index]
	}
	
	play(): void {
		interface MemberWithId {
			id: number,
			name: string,
			strikethrough: boolean
		}
		if (!this.availableToPlay) throw new Error()
		const membersWithId = this.#members.reduce((acc: MemberWithId[], el, index) => {
			const memberWithId: MemberWithId = { id: index, name: el.name, strikethrough: el.strikethrough }
			return [...acc, memberWithId]
		}, [])
		
		const availableMembers = membersWithId.filter(member => !member.strikethrough)
		const indexOfCandidate = randomIntFromInterval(0, availableMembers.length - 1)
		const candidate = availableMembers[indexOfCandidate]
		this.#candidateToCurrent = candidate.name
		this.#members[candidate.id].strikethrough = true
	}

	confirm(): void {
		this.#current = this.#candidateToCurrent
		this.#candidateToCurrent = null
	}

	reset(): void {
		this.#current = null
		this.#candidateToCurrent = null
		this.#members = this.#members.map(member => new RouletteMember(member.name, false))
	}

	toPrimitives(): any {
		return {
			id: this.#id,
			name: this.#name,
			groupId: this.#groupId,
			members: this.#members.map(member => ({name: member.name, strikethrough: member.strikethrough })),
			current: this.#current
		}
	}

	static fromPrimitives(plainData: {
		id: string
		groupId: string
		name: string
		members: { name: string, strikethrough: boolean }[]
		current: string | null
	}): Roulette {
		return new Roulette(plainData.id, plainData.groupId, plainData.name, plainData.members, plainData.current)
	}

	clone(): Roulette {
		return new Roulette(this.#id, this.#groupId, this.#name, this.#members, this.#current)
	}
}
