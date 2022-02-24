import { MotherCreator } from './MotherCreator'

const MIN_LENGTH = 0
const MAX_LENGTH = 14

export class WordMother {
	static random(): string {
		let randomNumber = Math.floor(Math.random() * (MAX_LENGTH - MIN_LENGTH)) + MIN_LENGTH
		if (randomNumber === 0) randomNumber = 1
		return MotherCreator.random().lorem.word(randomNumber)
	}
}
