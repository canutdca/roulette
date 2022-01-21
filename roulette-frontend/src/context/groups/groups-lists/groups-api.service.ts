import { httpGet } from '_core/services/http.service'
import { Group } from '../_shared/group.model'

const endpoint = '/groups'

export async function getGroupsApi(): Promise<Group[]> {
	return (await httpGet<Group[]>(endpoint))
}
