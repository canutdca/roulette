import { v4 as uuidv4 } from 'uuid'

export class GroupRoulette
 {
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
}
