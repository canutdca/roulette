import { GetSingleGroupRequest } from '../../../../../src/contexts/core/groups/application/GetSingleGroupRequest'
import { GroupId } from '../../../../../src/contexts/core/_shared/domain/Groups/GroupId'
import { GroupIdMother } from '../../_shared/domain/groups/GroupIdMother'

export class GetSingleGroupRequestMother {
	static create(id: GroupId): GetSingleGroupRequest {
		return { id: id.value }
	}

	static random(): GetSingleGroupRequest {
		return this.create(GroupIdMother.random())
	}
}
