import { CeremonyId } from "../../_shared/domain/ceremonies/CeremonyId"
import { CeremonyName } from "../../_shared/domain/ceremonies/CeremonyName"
import { Ceremony } from "../domain/Ceremony"
import { CeremonyRepository } from "../domain/CeremonyRepository"
import { CreateCeremonyFromGroupRequest } from "./CreateCeremonyFromGroupRequest"
import { CeremonyMember } from '../domain/CeremonyMember';
import { CeremonyMemberName } from "../domain/CeremonyMemberName"
import { CeremonyMemberStrikethrough } from "../domain/CeremonyMemberStrikethrough"
import { CeremonyCurrent } from '../domain/CeremonyCurrent';
import { CeremonyGroupId } from "../domain/CeremonyGroupId"

export class CreateCeremonyFromGroup{
	private readonly repository: CeremonyRepository

	constructor(repository: CeremonyRepository) {
		this.repository = repository
	}

	async run(request: CreateCeremonyFromGroupRequest): Promise<void> {
		const ceremony = new Ceremony(
			new CeremonyId(request.id),
			new CeremonyGroupId(request.groupId),
			new CeremonyName(request.name),
			request.members.map(member => new CeremonyMember(new CeremonyMemberName(member)))
		)

		const oldCeremony = await this.repository.getSingle(new CeremonyId(request.id))
		if (!oldCeremony)
			return await this.repository.save(ceremony)
		
		const newCeremony = new Ceremony(
			new CeremonyId(request.id),
			new CeremonyGroupId(request.groupId),
			new CeremonyName(request.name),
			oldCeremony.members.map(member => new CeremonyMember(new CeremonyMemberName(member.name.value), new CeremonyMemberStrikethrough(member.strikethrough.value))),
			oldCeremony.current ? new CeremonyCurrent(oldCeremony.current?.value) : null
		)
		await this.repository.save(newCeremony)
	}
}
