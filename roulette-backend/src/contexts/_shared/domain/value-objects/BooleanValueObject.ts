import { ValueObject } from './ValueObject'

export abstract class BooleanValueObject extends ValueObject<boolean> {

	constructor(value: boolean) {
		super(value)
	}

	toString(): string {
		return this.value.toString()
	}
}
