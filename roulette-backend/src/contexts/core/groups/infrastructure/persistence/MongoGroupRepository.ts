import { MongoRepository } from '../../../../_shared/infrastructure/persistence/mongo/MongoRepository'
import { GroupId } from '../../../_shared/domain/groups/GroupId'
import { Group } from '../../domain/Group'
import { GroupRepository } from '../../domain/GroupRepository'

interface GroupDocument {
	_id: string
	name: string
	members: string[]
	ceremonies: { id: string, name: string }[]
}

export class MongoGroupRepository extends MongoRepository<Group> implements GroupRepository {

	async getAll(): Promise<Group[]> {
		const collection = await this.collection()
		const documents = await collection.find<GroupDocument>({}).toArray()

		return documents.map(document =>
			Group.fromPrimitives({ name: document.name, id: document._id, members: document.members, ceremonies: document.ceremonies }))
	}

	async getSingle(id: GroupId): Promise<Group | null> {
		const collection = await this.collection()
		const document = await collection.findOne<GroupDocument>({ _id: id.value })

		if (!document) return null

		return Group.fromPrimitives({ name: document.name, id: document._id, members: document.members, ceremonies: document.ceremonies })
	}

	save(group: Group): Promise<void> {
		return this.persist(group.id.value, group)
	}

	delete(id: GroupId): Promise<void> {
		return this.remove(id.value);
	}

	protected collectionName(): string {
		return 'Groups'
	}
}
