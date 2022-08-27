import { CeremonyId } from '../../_shared/domain/ceremonies/CeremonyId'
import { Ceremony } from './ceremony'

export interface CeremonyRepository {
	getAll(): Promise<Ceremony[]>
	getSingle(id: CeremonyId): Promise<Ceremony | null>
	save(Ceremony: Ceremony): Promise<void>
	delete(id: CeremonyId): Promise<void>
}
