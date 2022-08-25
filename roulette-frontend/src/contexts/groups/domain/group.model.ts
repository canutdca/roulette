import { Cloneable } from 'contexts/_shared/domain/Cloneable.model'
import { Saveable } from 'contexts/_shared/domain/Saveable.model'
import { v4 as uuidv4 } from 'uuid'
import { GroupRoulette } from './group-roulette.model';

export class Group implements Saveable, Cloneable<Group> {
	#id: string
	get id(): string {
		return this.#id
	}

	#name: string
	get name(): string {
		return this.#name
	}
	set name(value: string) {
		this.#name = value
	}

	#members: string[]
	get members(): string[] {
		return this.#members
	}

	#roulettes: GroupRoulette[]
	get roulettes(): GroupRoulette[] {
		return this.#roulettes
	}

	constructor(id: string = '', name: string = '', members: string[] = [], roulettes: { id: string, name: string }[] = []) {
		this.#id = id || uuidv4()
		this.#name = name
		this.#members = members
		this.#roulettes = roulettes?.map(roulette => new GroupRoulette(roulette.id, roulette.name))
	}

	addMember(newMember: string) {
		this.#members = [...this.#members, newMember]
	}

	editMember(indexMember: number, newNameMember: string) {
		this.#members[indexMember] = newNameMember
	}
	
	deleteMember(indexMember: number) {
		this.#members = this.#members.filter((_, i) => i !== indexMember)
	}

	addRoulette(newRouletteName: string): string {
		const newGroup = new GroupRoulette('', newRouletteName)
		this.#roulettes = [...this.#roulettes, newGroup]
		return newGroup.id
	}

	editRoulette(rouletteId: string, newNameMember: string) {
		const asd = this.#roulettes.find(roulette => roulette.id === rouletteId)
		asd!.name = newNameMember
	}
	
	deleteRoulette(rouletteId: string) {
		this.#roulettes = this.#roulettes.filter(roulette => roulette.id !== rouletteId)
	}

	toPrimitives(): any {
		return {
			id: this.#id,
			name: this.#name,
			members: this.#members,
			roulettes: this.#roulettes?.map(roulette => ({id: roulette.id, name: roulette.name }))
		}
	}

	static fromPrimitives(plainData: {
		id: string
		name: string
		members: string[]
		roulettes: { id: string, name: string }[]
	}): Group {
		return new Group(plainData.id, plainData.name, plainData.members, plainData.roulettes)
	}

	clone(): Group {
		return new Group(this.#id, this.#name, this.#members, this.#roulettes)
	}
}
