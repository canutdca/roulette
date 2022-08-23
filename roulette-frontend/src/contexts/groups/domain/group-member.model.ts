import { v4 as uuidv4 } from 'uuid'

export class GroupMember {
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

	constructor(name: string) {
		this.#id = uuidv4()
		this.#name = name
	}
}
