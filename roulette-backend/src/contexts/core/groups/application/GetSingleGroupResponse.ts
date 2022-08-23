export interface GetSingleGroupResponse {
	id: string
	name: string
	members: string[]
	roulettes: { id: string, name: string }[]

}
