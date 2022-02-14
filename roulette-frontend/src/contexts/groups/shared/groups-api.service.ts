import { httpGet } from '_core/services/http.service'
import { Group } from './group.model'

const endpoint = '/groups'

export async function getGroupsApi(): Promise<Group[]> {
	return (await httpGet<Group[]>(endpoint))
}

export async function getGroupApi(id: string): Promise<Group> {
	return (await httpGet<Group>(`${endpoint}/${id}`))
}
