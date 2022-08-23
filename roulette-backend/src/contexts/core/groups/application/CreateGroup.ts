import { GroupId } from '../../_shared/domain/groups/GroupId'
import { Group } from '../domain/Group'
import { GroupName } from '../domain/GroupName'
import { GroupRepository } from '../domain/GroupRepository'
import { GroupMember } from '../domain/GroupMember'
import { CreateGroupRequest } from './CreateGroupRequest'
import { GroupRoulette } from '../domain/GroupRoulette'
import { GroupRouletteName } from '../domain/GroupRouletteName'
import { GroupRouletteId } from '../domain/GroupRouletteId'

export class CreateGroup {
	private readonly repository: GroupRepository

	constructor(repository: GroupRepository) {
		this.repository = repository
	}

	async run(request: CreateGroupRequest): Promise<void> {
		const group = new Group(
			new GroupId(request.id),
			new GroupName(request.name),
			request.members?.map(member => new GroupMember(member)) || [],
			request.roulettes?.map(roulette => new GroupRoulette(new GroupRouletteId(roulette.id), new GroupRouletteName(roulette.name))) || [],
		)
		await this.repository.save(group)
	}
}
