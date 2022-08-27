import { CeremonyRepository } from '../domain/CeremonyRepository'
import { DeleteCeremonyRequest } from './DeleteCeremonyRequest'
import { CeremonyId } from '../../_shared/domain/ceremonies/CeremonyId'
import { PeristenceErrorBecauseNotExist } from '../../../_shared/infrastructure/persistence/persistence-errors'
import { ErrorToDelete } from './delete-ceremony-errors'

export class DeleteCeremony {
	private readonly repository: CeremonyRepository

	constructor(repository: CeremonyRepository) {
		this.repository = repository
	}

	async run(request: DeleteCeremonyRequest): Promise<void> {
		try {
			await this.repository.delete(new CeremonyId(request.id))
		} catch (error) {
			if (error instanceof PeristenceErrorBecauseNotExist)
				throw new ErrorToDelete()
			throw error
		}
	}
}
