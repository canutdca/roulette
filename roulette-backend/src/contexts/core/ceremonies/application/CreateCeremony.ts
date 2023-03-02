import { CeremonyId } from "../../_shared/domain/ceremonies/CeremonyId"
import { CeremonyName } from "../../_shared/domain/ceremonies/CeremonyName"
import { Ceremony } from "../domain/Ceremony"
import { CeremonyCurrent } from "../domain/CeremonyCurrent"
import { CeremonyGroupId } from "../domain/CeremonyGroupId"
import { CeremonyMember } from "../domain/CeremonyMember"
import { CeremonyMemberName } from "../domain/CeremonyMemberName"
import { CeremonyMemberStrikethrough } from "../domain/CeremonyMemberStrikethrough"
import { CeremonyRepository } from "../domain/CeremonyRepository"
import { CreateCeremonyRequest } from "./CreateCeremonyRequest"

export class CreateCeremony {
	private readonly repository: CeremonyRepository

	constructor(repository: CeremonyRepository) {
		this.repository = repository
	}

	async run(request: CreateCeremonyRequest): Promise<void> {
		const ceremony = new Ceremony(
			new CeremonyId(request.id),
			new CeremonyGroupId(request.groupId),
			new CeremonyName(request.name),
			request.members?.map(member => new CeremonyMember(
				new CeremonyMemberName(member.name),
				new CeremonyMemberStrikethrough(member.strikethrough)
			)) || [],
			request.current ? new CeremonyCurrent(request.current) : null,
		)
		await this.repository.save(ceremony)
	}
}
