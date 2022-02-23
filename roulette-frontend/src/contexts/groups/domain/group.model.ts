import { Cloneable } from 'contexts/_shared/domain/Cloneable.model'
import { Saveable } from 'contexts/_shared/domain/Saveable.model'
import { v4 as uuidv4 } from 'uuid'

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

	constructor(id: string = '', name: string = '') {
		this.#id = id || uuidv4()
		this.#name = name
	}

	toPrimitives(): any {
		return {
			id: this.#id,
			name: this.#name
		}
	}

	static fromPrimitives(plainData: {
		id: string
		name: string
	}): Group {
		return new Group(plainData.id, plainData.name)
	}

	clone(): Group {
		return new Group(this.#id, this.#name)
	}
}
