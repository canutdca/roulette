export interface GetGroupsResponse {
	list: GroupResponse[]
}

export interface GroupResponse {
	id: string
	name: string
	members: string[]
	roulettes: { id: string, name: string }[]
}
