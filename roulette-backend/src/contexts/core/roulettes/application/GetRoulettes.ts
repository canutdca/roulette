import { RouletteRepository } from '../domain/RouletteRepository'
import { GetRoulettesResponse } from './GetRoulettesResponse'

export class GetRoulettes {
	private readonly repository: RouletteRepository

	constructor(repository: RouletteRepository) {
		this.repository = repository
	}

	async run(): Promise<GetRoulettesResponse> {
		const roulettes = await this.repository.getAll()

		return {
			list: roulettes.map(roulette => ({
				id: roulette.id.value,
				groupId: roulette.groupId.value,
				name: roulette.name.value,
				members: roulette.members?.map(member => ({name: member.name.value, strikethrough: member.strikethrough.value})),
				current: roulette.current ? roulette.current.value : null
			}))
		}
	}
}
