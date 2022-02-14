import { GroupRepository } from '../domain/GroupRepository'
import { GetGroupsResponse } from './GetGroupsResponse'

export class GetGroups {
	private readonly repository: GroupRepository

	constructor(repository: GroupRepository) {
		this.repository = repository
	}

	async run(): Promise<GetGroupsResponse> {
		const courses = await this.repository.getAll()
		return {
			list: courses.map(course => ({id: course.id.value, name: course.name.value}))
		}
	}
}
