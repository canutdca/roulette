import { GroupId } from '../../_shared/domain/groups/GroupId'
import { Group } from '../domain/Group'
import { GroupName } from '../domain/GroupName'
import { GroupRepository } from '../domain/GroupRepository'
import { GroupMember } from '../domain/GroupMember'
import { CreateGroupRequest } from './CreateGroupRequest'
import { GroupRoulette } from '../domain/GroupRoulette'
import { GroupRouletteName } from '../domain/GroupRouletteName'
import { GroupRouletteId } from '../domain/GroupRouletteId'
import { CreateRoulette } from '../domain/CreateRoulette'

export class CreateGroup {
	private readonly repository: GroupRepository
	private readonly createRoulette: CreateRoulette

	constructor(repository: GroupRepository, createRoulette: CreateRoulette ) {
		this.repository = repository
		this.createRoulette = createRoulette
	}

	async run(request: CreateGroupRequest): Promise<void> {
		const originalGroup = await this.repository.getSingle(new GroupId(request.id))

		const group = new Group(
			new GroupId(request.id),
			new GroupName(request.name),
			request.members?.map(member => new GroupMember(member)) || [],
			request.roulettes?.map(roulette => new GroupRoulette(new GroupRouletteId(roulette.id), new GroupRouletteName(roulette.name))) || [],
		)

		await Promise.all([
			this.repository.save(group),
			originalGroup && this.getRoulettesToSave(originalGroup.roulettes, group.roulettes)
				.map(groupRoulette => this.createRoulette.create(groupRoulette.id.value, groupRoulette.name.value))
		])

		// TODO: do this with a command bus or similar for save the roulettes
	}

	private getRoulettesToSave(originalRoulettes: GroupRoulette[], newRoulettes: GroupRoulette[]): GroupRoulette[] {
		const rouletesToSave: GroupRoulette[] = []
		newRoulettes.forEach(newRoulette => {
			const originalRoulette = originalRoulettes.find(original => original.id.value === newRoulette.id.value)
			if (!originalRoulette) {
				rouletesToSave.push(newRoulette)
				return 
			}
			if (originalRoulette!.name.value !== newRoulette.name.value ) rouletesToSave.push(newRoulette)
		})

		return rouletesToSave
	}
}
