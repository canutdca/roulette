import { CreateGroupRequest } from "../../../../../src/contexts/core/groups/application/CreateGroupRequest"
import { GroupName } from "../../../../../src/contexts/core/groups/domain/GroupName"
import { GroupId } from "../../../../../src/contexts/core/_shared/domain/Groups/GroupId"
import { GroupIdMother } from "../../_shared/domain/groups/GroupIdMother"
import { GroupNameMother } from "../domain/GroupNameMother"

export class CreateGroupRequestMother {
	static create(id: GroupId, name: GroupName): CreateGroupRequest {
		return {
			id: id.value,
			name: name.value
		}
	}

	static random(): CreateGroupRequest {
		return this.create(GroupIdMother.random(), GroupNameMother.random())
	}
}