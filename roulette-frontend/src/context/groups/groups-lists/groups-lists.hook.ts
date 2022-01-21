import { getGroupsApi } from './groups-api.service'

export function useGroupsList() {

	const getGroups = async () =>
		await getGroupsApi()

	return {
		getGroups
	}
}
