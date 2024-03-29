export interface GetGroupsResponse {
	list: GroupResponse[]
}

export interface GroupResponse {
	id: string
	name: string
	members: string[]
	ceremonies: { id: string, name: string }[]
}
