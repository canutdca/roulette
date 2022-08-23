import { httpDelete, httpGet, httpPutOrPost } from '_core/services/http.service'
import { Group } from '../domain/group.model'
import { GroupApi } from './group-api.model'

const endpoint = '/groups'

export async function getGroupsApi(): Promise<Group[]> {
	return (await httpGet<Group[]>(endpoint))
}

export async function getGroupApi(id: string): Promise<Group> {
	const response = await httpGet<GroupApi>(`${endpoint}/${id}`)
	return Group.fromPrimitives({
		id: response.id,
		name: response.name,
		members: response.members,
		roulettes: response.roulettes
	})
}

export async function saveGroupApi(group: Group): Promise<void> {
	await httpPutOrPost<Group>(endpoint, group)
}

export async function deleteGroupApi(id: string): Promise<void> {
	await httpDelete(`${endpoint}/${id}`)
}
