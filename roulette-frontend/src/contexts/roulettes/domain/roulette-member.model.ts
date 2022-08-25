export class RouletteMember
 {
	#name: string
	get name(): string {
		return this.#name
	}
	set name(value: string) {
		this.#name = value
	}

    #strikethrough: boolean
	get strikethrough(): boolean {
		return this.#strikethrough
	}
	set strikethrough(value: boolean) {
		this.#strikethrough = value
	}

	constructor(name: string, strikethrough: boolean) {
		this.#name = name
        this.#strikethrough = strikethrough
	}
}
