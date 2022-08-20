import { httpDelete, httpGet, httpPutOrPost } from '_core/services/http.service'
import { Group } from '../domain/group.model'

const endpoint = '/groups'

export async function getGroupsApi(): Promise<Group[]> {
	return (await httpGet<Group[]>(endpoint))
}

export async function getGroupApi(id: string): Promise<Group> {
	const response = await httpGet<Group>(`${endpoint}/${id}`)
	return Group.fromPrimitives({
		id: response.id,
		name: response.name
	})
}

export async function saveGroupApi(group: Group): Promise<void> {
	await httpPutOrPost<Group>(endpoint, group)
}

export async function deleteGroupApi(id: string): Promise<void> {
	await httpDelete(`${endpoint}/${id}`)
}
