import { MongoRepository } from '../../../../_shared/infrastructure/persistence/mongo/MongoRepository'
import { Group } from '../../domain/Group'
import { GroupRepository } from '../../domain/GroupRepository'

interface GroupDocument {
	_id: string
	name: string
	duration: string
}

export class MongoGroupRepository extends MongoRepository<Group> implements GroupRepository {

	async getAll(): Promise<Group[]> {
		const collection = await this.collection()
		const documents = await collection.find<GroupDocument>({}).toArray()

		return documents.map(document =>
			Group.fromPrimitives({ name: document.name, id: document._id }))
	}

	save(group: Group): Promise<void> {
		return this.persist(group.id.value, group)
	}

	protected collectionName(): string {
		return 'Groups'
	}
}
