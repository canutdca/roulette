import { RouletteId } from '../../_shared/domain/roulettes/RouletteId'
import { Roulette } from './roulette'

export interface RouletteRepository {
	getAll(): Promise<Roulette[]>
	getSingle(id: RouletteId): Promise<Roulette | null>
	save(Roulette: Roulette): Promise<void>
	delete(id: RouletteId): Promise<void>
}
