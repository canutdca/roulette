import { RouletteRepository } from '../domain/RouletteRepository'
import { DeleteRouletteRequest } from './DeleteRouletteRequest'
import { RouletteId } from '../../_shared/domain/roulettes/RouletteId'
import { PeristenceErrorBecauseNotExist } from '../../../_shared/infrastructure/persistence/persistence-errors'
import { ErrorToDelete } from './delete-roulette-errors'

export class DeleteRoulette {
	private readonly repository: RouletteRepository

	constructor(repository: RouletteRepository) {
		this.repository = repository
	}

	async run(request: DeleteRouletteRequest): Promise<void> {
		try {
			await this.repository.delete(new RouletteId(request.id))
		} catch (error) {
			if (error instanceof PeristenceErrorBecauseNotExist)
				throw new ErrorToDelete()
			throw error
		}
	}
}
