import { GroupRepository } from '../domain/GroupRepository'
import { GetGroupResponse } from './GetGroupsResponse'

export class GetGroups {
	private readonly repository: GroupRepository

	constructor(repository: GroupRepository) {
		this.repository = repository
	}

	async run(): Promise<GetGroupResponse> {
		const courses = await this.repository.getAll()
		return {
			list: courses.map(course => ({id: course.id.value, name: course.name.value}))
		}
	}
}
