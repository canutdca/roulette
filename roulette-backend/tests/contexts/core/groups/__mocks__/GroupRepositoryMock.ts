import { Group } from '../../../../../src/contexts/core/groups/domain/Group'
import { GroupId } from '../../../../../src/contexts/core/_shared/domain/Groups/GroupId'
import { GroupMother } from '../domain/GroupMother'
import { GroupRepository } from './../../../../../src/contexts/core/groups/domain/GroupRepository'

export class GroupRepositoryMock implements GroupRepository {
	getSingle(id: GroupId): Promise<Group | null> {
		return Promise.resolve(GroupMother.randomButId(id))
	}
	private mockSave = jest.fn()

	getAll(): Promise<Group[]> {
		return Promise.resolve([
			GroupMother.random(),
			GroupMother.random(),
		])
	}

	async save(course: Group): Promise<void> {
		this.mockSave(course)
	}
}
