export interface CreateRouletteRequest {
	id: string
	name: string
	groupId: string
	members?: { name: string, strikethrough: boolean }[]
	current?: string
}
