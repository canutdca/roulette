import { CeremonyRepository } from '../domain/CeremonyRepository'
import { GetCeremoniesResponse } from './GetCeremoniesResponse'

export class GetCeremonies {
	private readonly repository: CeremonyRepository

	constructor(repository: CeremonyRepository) {
		this.repository = repository
	}

	async run(): Promise<GetCeremoniesResponse> {
		const ceremonies = await this.repository.getAll()

		return {
			list: ceremonies.map(ceremony => ({
				id: ceremony.id.value,
				groupId: ceremony.groupId.value,
				name: ceremony.name.value,
				members: ceremony.members?.map(member => ({name: member.name.value, strikethrough: member.strikethrough.value})),
				current: ceremony.current ? ceremony.current.value : null
			}))
		}
	}
}
