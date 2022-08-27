import { MongoRepository } from '../../../../_shared/infrastructure/persistence/mongo/MongoRepository'
import { CeremonyId } from '../../../_shared/domain/ceremonies/CeremonyId'
import { Ceremony } from '../../domain/Ceremony'
import { CeremonyRepository } from '../../domain/CeremonyRepository'

interface CeremonyDocument {
	_id: string
	groupId: string
	name: string
	members: { name: string, strikethrough: boolean }[]
	current: string
}

export class MongoCeremonyRepository extends MongoRepository<Ceremony> implements CeremonyRepository {
	async getAll(): Promise<Ceremony[]> {
		const collection = await this.collection()
		const documents = await collection.find<CeremonyDocument>({}).toArray()

		return documents.map(document =>
			Ceremony.fromPrimitives({ name: document.name, id: document._id, groupId: document.groupId, members: document.members, current: document.current }))
	}

	async getSingle(id: CeremonyId): Promise<Ceremony | null> {
		const collection = await this.collection()
		const document = await collection.findOne<CeremonyDocument>({ _id: id.value })

		if (!document) return null

		return Ceremony.fromPrimitives({ name: document.name, id: document._id, groupId: document.groupId, members: document.members, current: document.current })
	}

	save(ceremony: Ceremony): Promise<void> {
		return this.persist(ceremony.id.value, ceremony)
	}

	delete(id: CeremonyId): Promise<void> {
		return this.remove(id.value);
	}

	protected collectionName(): string {
		return 'Ceremonies'
	}
}
