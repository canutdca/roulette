import { CeremonyRepository } from '../domain/CeremonyRepository'
import { DeleteSingleCeremonyRequest } from './DeleteSingleCeremonyRequest'
import { CeremonyId } from '../../_shared/domain/ceremonies/CeremonyId'
import { PeristenceErrorBecauseNotExist } from '../../../_shared/infrastructure/persistence/persistence-errors'
import { ErrorToDelete } from './delete-ceremony-errors'

export class DeleteSingleCeremony {
	private readonly repository: CeremonyRepository

	constructor(repository: CeremonyRepository) {
		this.repository = repository
	}

	async run(request: DeleteSingleCeremonyRequest): Promise<void> {
		try {
			await this.repository.deleteSingle(new CeremonyId(request.id))
		} catch (error) {
			if (error instanceof PeristenceErrorBecauseNotExist)
				throw new ErrorToDelete()
			throw error
		}
	}
}
