import { MotherCreator } from './MotherCreator'

const MIN_LENGTH = 0
const MAX_LENGTH = 14

export class WordMother {
	static random(): string {
		const randomNumber = Math.floor(Math.random() * (MAX_LENGTH - MIN_LENGTH)) + MIN_LENGTH
		return MotherCreator.random().lorem.word(randomNumber)
	}
}
