import { MongoRepository } from '../../../../_shared/infrastructure/persistence/mongo/MongoRepository'
import { GroupId } from '../../../_shared/domain/Groups/GroupId'
import { Group } from '../../domain/Group'
import { GroupName } from '../../domain/GroupName'
import { GroupRepository } from '../../domain/GroupRepository'

// interface GroupDocument {
// 	_id: string
// 	name: string
// 	duration: string
// }

export class MongoGroupRepository extends MongoRepository<Group> implements GroupRepository {

	async getAll(): Promise<Group[]> {
		return Promise.resolve([
			new Group(new GroupId('b525efa2-77f0-11ec-90d6-0242ac120003'), new GroupName('Group 1')),
			new Group(new GroupId('63b78634-7a21-11ec-90d6-0242ac120003'), new GroupName('Group 2'))
		])
		// const collection = await this.collection()
		// const documents = await collection.find<GroupDocument>({}).toArray()

		// return documents.map(document =>
		// 	Group.fromPrimitives({ name: document.name, id: document._id }))

	}

	protected collectionName(): string {
		return 'Groups'
	}
}
