export interface GetSingleGroupResponse {
	id: string
	name: string
	members: string[]
	ceremonies: { id: string, name: string }[]

}
