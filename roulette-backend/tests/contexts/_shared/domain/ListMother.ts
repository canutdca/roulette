import { MotherCreator } from './MotherCreator'

export class ListMother {
	static randomWithRandomElements(random: Function): any[] {
		const numOfElements = MotherCreator.random().datatype.number({ min: 1, max: 10 })
		const list: any[] = []
		for (let i = 0; i < numOfElements; i++)
			list.push(random())
		return list
	}
}
