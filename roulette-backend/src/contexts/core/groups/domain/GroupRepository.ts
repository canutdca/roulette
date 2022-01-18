import { Group } from './Group'

export interface GroupRepository {
	getAll(): Promise<Group[]>
}
