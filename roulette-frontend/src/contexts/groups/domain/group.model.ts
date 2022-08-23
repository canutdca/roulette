import { Cloneable } from 'contexts/_shared/domain/Cloneable.model'
import { Saveable } from 'contexts/_shared/domain/Saveable.model'
import { v4 as uuidv4 } from 'uuid'
import { GroupMember } from './group-member.model';

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

	constructor(id: string = '', name: string = '', members: string[] = []) {
		this.#id = id || uuidv4()
		this.#name = name
		this.#members = members
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

	toPrimitives(): any {
		return {
			id: this.#id,
			name: this.#name,
			members: this.#members
		}
	}

	static fromPrimitives(plainData: {
		id: string
		name: string
		members: string[]
	}): Group {
		return new Group(plainData.id, plainData.name, plainData.members)
	}

	clone(): Group {
		return new Group(this.#id, this.#name, this.#members)
	}
}
