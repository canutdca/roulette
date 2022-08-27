import { CeremonyRepository } from '../domain/CeremonyRepository'
import { PeristenceErrorBecauseNotExist } from '../../../_shared/infrastructure/persistence/persistence-errors'
import { ErrorToDelete } from './delete-ceremony-errors'

export class DeleteCeremonies {
	private readonly repository: CeremonyRepository

	constructor(repository: CeremonyRepository) {
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
