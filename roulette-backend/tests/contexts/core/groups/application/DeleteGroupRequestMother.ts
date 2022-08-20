import { DeleteGroupRequest } from '../../../../../src/contexts/core/groups/application/DeleteGroupRequest'
import { GroupId } from '../../../../../src/contexts/core/_shared/domain/Groups/GroupId'
import { GroupIdMother } from '../../_shared/domain/groups/GroupIdMother'

export class DeleteGroupRequestMother {
	static create(id: GroupId): DeleteGroupRequest {
		return { id: id.value }
	}

	static random(): DeleteGroupRequest {
		return this.create(GroupIdMother.random())
	}
}
