import { GroupId } from '../../_shared/domain/Groups/GroupId'
import { Group } from './Group'

export interface GroupRepository {
	getAll(): Promise<Group[]>
	getSingle(id: GroupId): Promise<Group | null>
	save(group: Group): Promise<void>
	delete(id: GroupId): Promise<void>
}
