export interface CreateGroupRequest {
	id: string
	name: string
	members?: string[]
	roulettes?: { id: string, name: string }[]
}
