import { useState } from 'react'
import { Group } from '../domain/group.model'
import { getGroupsApi } from '../shared/groups-api.service'

export function useGroupsList() {
	const [groups, setGroups] = useState<Group[]>([])

	const getGroups = async () =>
		setGroups(await getGroupsApi())

	return {
		groups,
		getGroups
	}
}
