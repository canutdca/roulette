import { useState } from 'react'
import { Group } from '../domain/group.model'
import { deleteGroupApi, getGroupApi, saveGroupApi } from '../shared/groups-api.service'

export function useGroupDetail(id: string | undefined) {

	const [group, setGroup] = useState<Group>()
	const getGroup = async () => {
		if (!id) return setGroup(new Group())
		setGroup(await getGroupApi(id))
	}

	const setGroupName = (newName: string): Promise<void> => {
		if (!group) return Promise.resolve()
		const groupUpdating = group.clone()
		try {
			groupUpdating.name = newName
			setGroup(groupUpdating)
			return saveGroupApi(groupUpdating)
		} catch (error: any) {
			return error.message
		}
	}

	const deleteGroup = async (): Promise<void> => {
		await deleteGroupApi(id!)
	}

	return {
		group,
		getGroup,
		setGroupName,
		deleteGroup
	}
}
