export interface GetSingleRouletteResponse {
	id: string
	groupId: string
	name: string
	members: { name: string, strikethrough: boolean }[]
	current: string | null
}
