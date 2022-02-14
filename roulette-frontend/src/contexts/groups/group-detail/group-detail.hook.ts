import { getGroupApi } from '../shared/groups-api.service'

export function useGroupDetail(id: string) {

	const getGroup = async () =>
		await getGroupApi(id)

	return {
		getGroup
	}
}
