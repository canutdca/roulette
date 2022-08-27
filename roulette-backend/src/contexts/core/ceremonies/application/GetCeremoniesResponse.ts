export interface GetCeremoniesResponse {
	list: CeremonyResponse[]
}

export interface CeremonyResponse {
	id: string
	groupId: string
	name: string
	members: { name: string, strikethrough: boolean }[]
	current: string | null
}
