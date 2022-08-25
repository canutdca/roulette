import { RouletteId } from "../../_shared/domain/roulettes/RouletteId"
import { RouletteRepository } from "../domain/RouletteRepository"
import { GetSingleRouletteRequest } from "./GetSingleRouletteRequest"
import { GetSingleRouletteResponse } from "./GetSingleRouletteResponse"


export class GetSingleRoulette {
	private readonly repository: RouletteRepository

	constructor(repository: RouletteRepository) {
		this.repository = repository
	}

	async run(request: GetSingleRouletteRequest): Promise<GetSingleRouletteResponse | null> {
		const roulette = await this.repository.getSingle(new RouletteId(request.id))
		if (!roulette) return null
		return {
			id: roulette.id.value,
			groupId: roulette.groupId.value,
			name: roulette.name.value,
			members: roulette.members?.map(member => ({name: member.name.value, strikethrough: member.strikethrough.value})),
			current: roulette.current ? roulette.current.value : null
		}
	}
}
