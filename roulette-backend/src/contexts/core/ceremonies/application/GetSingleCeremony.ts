import { CeremonyId } from "../../_shared/domain/ceremonies/CeremonyId"
import { CeremonyRepository } from "../domain/CeremonyRepository"
import { GetSingleCeremonyRequest } from "./GetSingleCeremonyRequest"
import { GetSingleCeremonyResponse } from "./GetSingleCeremonyResponse"


export class GetSingleCeremony {
	private readonly repository: CeremonyRepository

	constructor(repository: CeremonyRepository) {
		this.repository = repository
	}

	async run(request: GetSingleCeremonyRequest): Promise<GetSingleCeremonyResponse | null> {
		const ceremony = await this.repository.getSingle(new CeremonyId(request.id))
		if (!ceremony) return null
		return {
			id: ceremony.id.value,
			groupId: ceremony.groupId.value,
			name: ceremony.name.value,
			members: ceremony.members?.map(member => ({name: member.name.value, strikethrough: member.strikethrough.value})),
			current: ceremony.current ? ceremony.current.value : null
		}
	}
}
