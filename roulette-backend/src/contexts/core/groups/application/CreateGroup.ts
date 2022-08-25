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
import { DeleteRoulette } from '../domain/DeleteRoulette'

export class CreateGroup {
	private readonly repository: GroupRepository
	private readonly createRoulette: CreateRoulette
	private readonly deleteRoulette: DeleteRoulette

	constructor(
		repository: GroupRepository,
		createRoulette: CreateRoulette,
		deleteRoulette: DeleteRoulette
	) {
		this.repository = repository
		this.createRoulette = createRoulette
		this.deleteRoulette = deleteRoulette
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
			originalGroup
				&& this.getRoulettesToSave(originalGroup.roulettes, group.roulettes)
					.map(groupRoulette =>
						this.createRoulette.create(
							groupRoulette.id.value,
							group.id.value,
							groupRoulette.name.value,
							group.members.map(member => member.value)
						)
					),
			originalGroup
				&& this.getRoulettesToDelete(originalGroup.roulettes, group.roulettes)
					.map(groupRoulette => this.deleteRoulette.delete(groupRoulette.id.value))
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

	private getRoulettesToDelete(originalRoulettes: GroupRoulette[], newRoulettes: GroupRoulette[]): GroupRoulette[] {
		const rouletesToDelete: GroupRoulette[] = originalRoulettes.reduce((acc: GroupRoulette[], el) => {
			if (newRoulettes.some(newRoulette => newRoulette.id === el.id)) return acc
			return [...acc, el]
		}, [])
		return rouletesToDelete
	}
}
