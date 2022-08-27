import { Cloneable } from 'contexts/_shared/domain/Cloneable.model'
import { Saveable } from 'contexts/_shared/domain/Saveable.model'
import { v4 as uuidv4 } from 'uuid'
import { GroupCeremony } from './group-ceremony.model';

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

	#ceremonies: GroupCeremony[]
	get ceremonies(): GroupCeremony[] {
		return this.#ceremonies
	}

	constructor(id: string = '', name: string = '', members: string[] = [], ceremonies: { id: string, name: string }[] = []) {
		this.#id = id || uuidv4()
		this.#name = name
		this.#members = members
		this.#ceremonies = ceremonies?.map(ceremony => new GroupCeremony(ceremony.id, ceremony.name))
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

	addCeremony(newCeremonyName: string): string {
		const newGroup = new GroupCeremony('', newCeremonyName)
		this.#ceremonies = [...this.#ceremonies, newGroup]
		return newGroup.id
	}

	editCeremony(ceremonyId: string, newNameMember: string) {
		const asd = this.#ceremonies.find(ceremony => ceremony.id === ceremonyId)
		asd!.name = newNameMember
	}
	
	deleteCeremony(ceremonyId: string) {
		this.#ceremonies = this.#ceremonies.filter(ceremony => ceremony.id !== ceremonyId)
	}

	toPrimitives(): any {
		return {
			id: this.#id,
			name: this.#name,
			members: this.#members,
			ceremonies: this.#ceremonies?.map(ceremony => ({id: ceremony.id, name: ceremony.name }))
		}
	}

	static fromPrimitives(plainData: {
		id: string
		name: string
		members: string[]
		ceremonies: { id: string, name: string }[]
	}): Group {
		return new Group(plainData.id, plainData.name, plainData.members, plainData.ceremonies)
	}

	clone(): Group {
		return new Group(this.#id, this.#name, this.#members, this.#ceremonies)
	}
}
