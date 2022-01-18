import validate from 'uuid-validate'
import { InvalidArgumentError } from './InvalidArgumentError'
import { ValueObject } from './ValueObject'

export class Uuid extends ValueObject<string> {

	constructor(value: string) {
		super(value)
		this.ensureIsValidUuid(value)
	}

	ensureIsValidUuid(id: string): void {
		if (!validate(id)) {
			throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${id}>`)
		}
	}
}
