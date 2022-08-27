import { GroupId } from '../../_shared/domain/groups/GroupId'
import { Group } from '../domain/Group'
import { GroupName } from '../domain/GroupName'
import { GroupRepository } from '../domain/GroupRepository'
import { GroupMember } from '../domain/GroupMember'
import { CreateGroupRequest } from './CreateGroupRequest'
import { GroupCeremony } from '../domain/GroupCeremony'
import { GroupCeremonyName } from '../domain/GroupCeremonyName'
import { GroupCeremonyId } from '../domain/GroupCeremonyId'
import { CreateCeremony } from '../domain/CreateCeremony'
import { DeleteCeremony } from '../domain/DeleteCeremony'

export class CreateGroup {
	private readonly repository: GroupRepository
	private readonly createCeremony: CreateCeremony
	private readonly deleteCeremony: DeleteCeremony

	constructor(
		repository: GroupRepository,
		createCeremony: CreateCeremony,
		deleteCeremony: DeleteCeremony
	) {
		this.repository = repository
		this.createCeremony = createCeremony
		this.deleteCeremony = deleteCeremony
	}

	async run(request: CreateGroupRequest): Promise<void> {
		const originalGroup = await this.repository.getSingle(new GroupId(request.id))

		const group = new Group(
			new GroupId(request.id),
			new GroupName(request.name),
			request.members?.map(member => new GroupMember(member)) || [],
			request.ceremonies?.map(ceremony => new GroupCeremony(new GroupCeremonyId(ceremony.id), new GroupCeremonyName(ceremony.name))) || [],
		)

		await Promise.all([
			this.repository.save(group),
			originalGroup
				&& this.getCeremoniesToSave(originalGroup.ceremonies, group.ceremonies)
					.map(groupCeremony =>
						this.createCeremony.create(
							groupCeremony.id.value,
							group.id.value,
							groupCeremony.name.value,
							group.members.map(member => member.value)
						)
					),
			originalGroup
				&& this.getCeremoniesToDelete(originalGroup.ceremonies, group.ceremonies)
					.map(groupCeremony => this.deleteCeremony.delete(groupCeremony.id.value))
		])
		// TODO: do this with a command bus or similar for save the ceremonies
	}

	private getCeremoniesToSave(originalCeremonies: GroupCeremony[], newCeremonies: GroupCeremony[]): GroupCeremony[] {
		const ceremoniesToSave: GroupCeremony[] = []
		newCeremonies.forEach(newCeremony => {
			const originalCeremony = originalCeremonies.find(original => original.id.value === newCeremony.id.value)
			if (!originalCeremony) {
				ceremoniesToSave.push(newCeremony)
				return 
			}
			if (originalCeremony!.name.value !== newCeremony.name.value ) ceremoniesToSave.push(newCeremony)
		})
		return ceremoniesToSave
	}

	private getCeremoniesToDelete(originalCeremonies: GroupCeremony[], newCeremonies: GroupCeremony[]): GroupCeremony[] {
		const ceremoniesToDelete: GroupCeremony[] = originalCeremonies.reduce((acc: GroupCeremony[], el) => {
			if (newCeremonies.some(newCeremony => newCeremony.id.value === el.id.value))
				return acc
			return [...acc, el]
		}, [])

		return ceremoniesToDelete
	}
}
