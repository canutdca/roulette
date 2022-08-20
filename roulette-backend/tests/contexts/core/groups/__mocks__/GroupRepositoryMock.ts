import { ListMother } from './../../../_shared/domain/ListMother'
import { Group } from '../../../../../src/contexts/core/groups/domain/Group'
import { GroupId } from '../../../../../src/contexts/core/_shared/domain/Groups/GroupId'
import { GroupMother } from '../domain/GroupMother'
import { GroupRepository } from './../../../../../src/contexts/core/groups/domain/GroupRepository'

export class GroupRepositoryMock implements GroupRepository {
	private mockSave = jest.fn()
	private mockDelete = jest.fn()

	getSingle(id: GroupId): Promise<Group | null> {
		return Promise.resolve(GroupMother.randomButId(id))
	}

	getAll(): Promise<Group[]> {
		return Promise.resolve(ListMother.randomWithRandomElements(GroupMother.random))
	}

	async save(group: Group): Promise<void> {
		this.mockSave(group)
	}

	async delete(id: GroupId): Promise<void> {
		this.mockDelete(id)
	}

	overwriteDeleteWithMock(mock: jest.Mock): void {
		this.delete = mock;
	}

	assertLastSavedGroupIs(expected: Group): void {
		const mock = this.mockSave.mock
		const lastSavedGroup = mock.calls[mock.calls.length - 1][0] as Group
		expect(lastSavedGroup).toBeInstanceOf(Group)
		expect(lastSavedGroup.id).toEqual(expected.id)
		expect(lastSavedGroup.name).toEqual(expected.name)
	}

	assertLastDeleteGroupIs(expected: GroupId): void {
		const mock = this.mockDelete.mock
		const lastDeletedroupId = mock.calls[mock.calls.length - 1][0] as GroupId
		expect(lastDeletedroupId).toEqual(expected)
	}
}
