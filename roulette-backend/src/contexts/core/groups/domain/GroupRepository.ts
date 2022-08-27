import { GroupId } from '../../_shared/domain/groups/GroupId'
import { Group } from './Group'

export interface GroupRepository {
	getAll(): Promise<Group[]>
	getSingle(id: GroupId): Promise<Group | null>
	save(group: Group): Promise<void>
	deleteSingle(id: GroupId): Promise<void>
	deleteAll(): Promise<void>
}
