import { GroupRepository } from '../domain/GroupRepository'
import { GetGroupsResponse } from './GetGroupsResponse'

export class GetGroups {
	private readonly repository: GroupRepository

	constructor(repository: GroupRepository) {
		this.repository = repository
	}

	async run(): Promise<GetGroupsResponse> {
		const groups = await this.repository.getAll()
		return {
			list: groups.map(group => ({
				id: group.id.value,
				name: group.name.value,
				members: group.members?.map(member => member.value),
				roulettes: group.roulettes?.map(roulette => ({id: roulette.id.value, name: roulette.name.value }))
			}))
		}
	}
}
