import { GroupId } from '../../_shared/domain/Groups/GroupId'
import { Group } from '../domain/Group'
import { GroupName } from '../domain/GroupName'
import { GroupRepository } from '../domain/GroupRepository'
import { CreateGroupRequest } from './CreateGroupRequest'

export class CreateGroup {
	private readonly repository: GroupRepository

	constructor(repository: GroupRepository) {
		this.repository = repository
	}

	async run(request: CreateGroupRequest): Promise<void> {
		const group = new Group(new GroupId(request.id), new GroupName(request.name))
		await this.repository.save(group)
	}
}
