import { MongoRepository } from '../../../../_shared/infrastructure/persistence/mongo/MongoRepository'
import { RouletteId } from '../../../_shared/domain/roulettes/RouletteId'
import { Roulette } from '../../domain/Roulette'
import { RouletteRepository } from '../../domain/RouletteRepository'

interface RouletteDocument {
	_id: string
	name: string
	members: { name: string, strikethrough: boolean }[]
	current: string
}

export class MongoRouletteRepository extends MongoRepository<Roulette> implements RouletteRepository {
	async getAll(): Promise<Roulette[]> {
		const collection = await this.collection()
		const documents = await collection.find<RouletteDocument>({}).toArray()

		return documents.map(document =>
			Roulette.fromPrimitives({ name: document.name, id: document._id, members: document.members, current: document.current }))
	}

	async getSingle(id: RouletteId): Promise<Roulette | null> {
		const collection = await this.collection()
		const document = await collection.findOne<RouletteDocument>({ _id: id.value })

		if (!document) return null

		return Roulette.fromPrimitives({ name: document.name, id: document._id, members: document.members, current: document.current })
	}

	save(roulette: Roulette): Promise<void> {
		return this.persist(roulette.id.value, roulette)
	}

	delete(id: RouletteId): Promise<void> {
		return this.remove(id.value);
	}

	protected collectionName(): string {
		return 'Roulettes'
	}
}
