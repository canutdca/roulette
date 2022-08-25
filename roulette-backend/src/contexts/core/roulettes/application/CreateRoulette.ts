import { RouletteId } from "../../_shared/domain/roulettes/RouletteId"
import { RouletteName } from "../../_shared/domain/roulettes/RouletteName"
import { Roulette } from "../domain/Roulette"
import { RouletteCurrent } from "../domain/RouletteCurrent"
import { RouletteGroupId } from "../domain/RouletteGroupId"
import { RouletteMember } from "../domain/RouletteMember"
import { RouletteMemberName } from "../domain/RouletteMemberName"
import { RouletteMemberStrikethrough } from "../domain/RouletteMemberStrikethrough"
import { RouletteRepository } from "../domain/RouletteRepository"
import { CreateRouletteRequest } from "./CreateRouletteRequest"

export class CreateRoulette{
	private readonly repository: RouletteRepository

	constructor(repository: RouletteRepository) {
		this.repository = repository
	}

	async run(request: CreateRouletteRequest): Promise<void> {
		const roulette = new Roulette(
			new RouletteId(request.id),
			new RouletteGroupId(request.groupId),
			new RouletteName(request.name),
			request.members?.map(member => new RouletteMember(
				new RouletteMemberName(member.name),
				new RouletteMemberStrikethrough(member.strikethrough)
			)) || [],
			request.current ? new RouletteCurrent(request.current) : null,
		)
		await this.repository.save(roulette)
	}
}
