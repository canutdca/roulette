import { DeleteGroup } from '../../../../../src/contexts/core/groups/application/DeleteGroup'
import { GroupRepositoryMock } from '../__mocks__/GroupRepositoryMock'
import { DeleteGroupRequestMother } from './DeleteGroupRequestMother'
import { GroupMother } from '../domain/GroupMother'
import { ErrorToDelete } from '../../../../../src/contexts/core/groups/application/delete-group-errors';
import { PeristenceErrorBecauseNotExist } from '../../../../../src/contexts/_shared/infrastructure/persistence/persistence-errors';

let repository: GroupRepositoryMock
let service: DeleteGroup

beforeEach(() => {
	repository = new GroupRepositoryMock()
	service = new DeleteGroup(repository)
})

describe('DeleteGroup', () => {
	it('work correct if the group already exist', async () => {
		const group = GroupMother.random();
		repository.save(group);
		
		const request = DeleteGroupRequestMother.create(group.id)
		await service.run(request)

		repository.assertLastDeleteGroupIs(group.id)
	})

	it('return exception if the group not exist', async () => {
		const group = GroupMother.random();
		repository.save(group);
		const mockDelete = jest.fn()
			.mockImplementation(() => { throw new PeristenceErrorBecauseNotExist() })
		repository.overwriteDeleteWithMock(mockDelete)

		const request = DeleteGroupRequestMother.random()
		await expect(service.run(request)).rejects.toThrow(ErrorToDelete)
	})
})
