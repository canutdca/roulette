import { RouletteId } from "../../_shared/domain/roulettes/RouletteId"
import { RouletteName } from "../../_shared/domain/roulettes/RouletteName"
import { Roulette } from "../domain/Roulette"
import { RouletteRepository } from "../domain/RouletteRepository"
import { CreateRouletteFromGroupRequest } from "./CreateRouletteFromGroupRequest"
import { RouletteMember } from '../domain/RouletteMember';
import { RouletteMemberName } from "../domain/RouletteMemberName"
import { RouletteMemberStrikethrough } from "../domain/RouletteMemberStrikethrough"
import { RouletteCurrent } from '../domain/RouletteCurrent';
import { RouletteGroupId } from "../domain/RouletteGroupId"

export class CreateRouletteFromGroup{
	private readonly repository: RouletteRepository

	constructor(repository: RouletteRepository) {
		this.repository = repository
	}

	async run(request: CreateRouletteFromGroupRequest): Promise<void> {
		const roulette = new Roulette(
			new RouletteId(request.id),
			new RouletteGroupId(request.groupId),
			new RouletteName(request.name),
			request.members.map(member => new RouletteMember(new RouletteMemberName(member)))
		)

		const oldRoulette = await this.repository.getSingle(new RouletteId(request.id))
		if (!oldRoulette)
			return await this.repository.save(roulette)
		
		const newRoulette = new Roulette(
			new RouletteId(request.id),
			new RouletteGroupId(request.groupId),
			new RouletteName(request.name),
			oldRoulette.members.map(member => new RouletteMember(new RouletteMemberName(member.name.value), new RouletteMemberStrikethrough(member.strikethrough.value))),
			oldRoulette.current ? new RouletteCurrent(oldRoulette.current?.value) : null
		)
		await this.repository.save(newRoulette)
	}
}
