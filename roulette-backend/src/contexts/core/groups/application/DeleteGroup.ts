import { GroupRepository } from '../domain/GroupRepository'
import { DeleteGroupRequest } from './DeleteGroupRequest'
import { GroupId } from '../../_shared/domain/Groups/GroupId'
import { PeristenceErrorBecauseNotExist } from '../../../_shared/infrastructure/persistence/persistence-errors'
import { ErrorToDelete } from './delete-group-errors'
export class DeleteGroup {
	private readonly repository: GroupRepository

	constructor(repository: GroupRepository) {
		this.repository = repository
	}

	async run(request: DeleteGroupRequest): Promise<void> {
		try {
			await this.repository.delete(new GroupId(request.id))
		} catch (error) {
			if (error instanceof PeristenceErrorBecauseNotExist)
				throw new ErrorToDelete()
			throw error
		}
	}
}
