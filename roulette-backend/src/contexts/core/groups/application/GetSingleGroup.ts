import { GroupRepository } from '../domain/GroupRepository'
import { GetSingleGroupResponse } from './GetSingleGroupResponse'
import { GetSingleGroupRequest } from './GetSingleGroupRequest'
import { GroupId } from '../../_shared/domain/Groups/GroupId'

export class GetSingleGroup {
	private readonly repository: GroupRepository

	constructor(repository: GroupRepository) {
		this.repository = repository
	}

	async run(request: GetSingleGroupRequest): Promise<GetSingleGroupResponse | null> {
		const group = await this.repository.getSingle(new GroupId(request.id))
		if (!group) return null
		return {
			id: group.id.value,
			name: group.name.value
		}
	}
}
