import { Group } from '../../../../../src/contexts/core/groups/domain/Group'
import { GroupName } from '../../../../../src/contexts/core/groups/domain/GroupName'
import { GroupId } from '../../../../../src/contexts/core/_shared/domain/Groups/GroupId'
import { GroupRepository } from './../../../../../src/contexts/core/groups/domain/GroupRepository'

export class GroupRepositoryMock implements GroupRepository {
	getAll(): Promise<Group[]> {
		return Promise.resolve([
			new Group(new GroupId('b525efa2-77f0-11ec-90d6-0242ac120003'), new GroupName('Group 1')),
			new Group(new GroupId('b525efa2-77f0-11ec-90d6-0242ac120003'), new GroupName('Group 2'))
		])
	}
}
