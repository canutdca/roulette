import { GroupRepository } from '../domain/GroupRepository'
import { PeristenceErrorBecauseNotExist } from '../../../_shared/infrastructure/persistence/persistence-errors'
import { ErrorToDelete } from './delete-group-errors'

export class DeleteGroups {
	private readonly repository: GroupRepository

	constructor(repository: GroupRepository) {
		this.repository = repository
	}

	async run(): Promise<void> {
		try {
			await this.repository.deleteAll()
		} catch (error) {
			if (error instanceof PeristenceErrorBecauseNotExist)
				throw new ErrorToDelete()
			throw error
		}
	}
}
