import { GroupRepository } from '../domain/GroupRepository'
import { DeleteSingleGroupRequest } from './DeleteSingleGroupRequest'
import { GroupId } from '../../_shared/domain/groups/GroupId'
import { PeristenceErrorBecauseNotExist } from '../../../_shared/infrastructure/persistence/persistence-errors'
import { ErrorToDelete } from './delete-group-errors'

export class DeleteSingleGroup {
	private readonly repository: GroupRepository

	constructor(repository: GroupRepository) {
		this.repository = repository
	}

	async run(request: DeleteSingleGroupRequest): Promise<void> {
		try {
			await this.repository.deleteSingle(new GroupId(request.id))
		} catch (error) {
			if (error instanceof PeristenceErrorBecauseNotExist)
				throw new ErrorToDelete()
			throw error
		}
	}
}
